import React, { useState, useEffect } from 'react'
import TabSet from 'components/TabSet'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import { createPublicClient, createWalletClient, custom, http } from 'viem'
import { CHAINS } from './configure'
import { walletHopperAddress } from 'abis'
import { FusionSDK, PrivateKeyProviderConnector } from '@1inch/fusion-sdk'
import { ethers } from 'ethers'

type AssetType = 'ETH' | 'APE' | 'USDC' | 'USDT'

interface TransactionStatus {
  status: 'success' | 'fail' | 'unknown'
  error?: string
  suggestion?: {
    description: string
    actionText: string
    actionFunction: () => void
  }
}

const tokenAddressBySymbol: Record<string, string> = {
  USDC: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  APE: '0x4d224452801aced8b2f0aebe155379bb5d594381',
  USDT: '0xdac17f958d2ee523a2206206994597c13d831ec7',
  WETH: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
}

type AsyncFunction<TArgs extends any[], TResult> = (...args: TArgs) => Promise<TResult>

function memoizeAsync<TArgs extends any[], TResult>(fn: AsyncFunction<TArgs, TResult>): AsyncFunction<TArgs, TResult> {
  const cache = new Map<string, Promise<TResult>>()

  return async (...args: TArgs): Promise<TResult> => {
    const key = JSON.stringify(args)

    if (cache.has(key)) {
      return (await cache.get(key))!
    }

    const resultPromise = fn(...args)
    cache.set(key, resultPromise)
    return await resultPromise
  }
}

export default function Home() {
  const [address, setAddress] = useState('')
  const [asset, setAsset] = useState<AssetType>('ETH')
  const [amount, setAmount] = useState('')
  const [transactionStatus, setTransactionStatus] = useState<TransactionStatus | null>(null)

  const getChainDetails = memoizeAsync(async function () {
    const walletClient = createWalletClient({
      transport: custom((window as any).ethereum),
    })

    const chainId = await walletClient.getChainId()

    const chain = CHAINS[chainId]

    const publicClient = () =>
      createPublicClient({
        chain: chain,
        transport: http(),
      })

    const [address] = await walletClient.getAddresses()

    return { walletClient, chainId, chain, address, publicClient }
  })

  useEffect(() => {
    setTransactionStatus(null)
  }, [address, asset, amount])

  const checkValidity = async () => {
    ;(async function () {
      let status: TransactionStatus | null = null

      const response = await axios.get('/api/wallet-meta', {
        params: {
          userAddress: address,
        },
      })
      if (response.data && (JSON.parse(response.data.data) as any).timestamp) {
        const recipientData = JSON.parse(response.data.data)

        for (const preferredAsset of recipientData.preferredAssets) {
          if (preferredAsset.chain == (await getChainDetails()).chain.name.toLowerCase()) {
            console.log('correct chain')
            if (preferredAsset.symbol === asset) {
              console.log('correct chain, correct asset')
              status = { status: 'success' }
            } else {
              console.log('correct chain, incorrect asset')
              console.log('need to swap')
              status = {
                status: 'fail',
                error: 'Incorrect asset',
                suggestion: {
                  description: `To complete this transaction, swap ${asset} to ${preferredAsset.symbol}`,
                  actionText: 'Swap and send',
                  actionFunction: async () => {
                    const caller = (await getChainDetails()).address
                    const swapFromTokenAddress = tokenAddressBySymbol[asset]
                    const swapToTokenAddress = tokenAddressBySymbol[preferredAsset.symbol]
                    const swapAmount = ethers.utils.parseUnits(amount, 1).toString()
                    const url = `https://api.1inch.io/v5.2/1/swap?src=${swapFromTokenAddress}&dst=${swapToTokenAddress}&amount=${swapAmount}&from=${caller}&slippage=1&disableEstimate=false&includeTokensInfo=true&includeProtocols=true&compatibility=true&allowPartialFill=false`
                    let response
                    try {
                      response = await axios.get(url)
                    } catch (error) {
                      toast.error('failed to generate swap')
                      return
                    }
                    console.log(response.data)
                    const swapData = response.data.tx
                    const walletClient = (await getChainDetails()).walletClient
                    const sendForSwap = {
                      // chain: await walletClient.getChainId(),
                      // account: (await getChainDetails()).address,
                      from: swapData.from,
                      to: swapData.to,
                      data: swapData.data,
                      value: swapData.value,
                    }
                    console.log(sendForSwap)
                    // let txnHash = await walletClient.sendTransaction(sendForSwap)
                    // send txn using ethers
                    const provider = new ethers.providers.Web3Provider((window as any).ethereum)
                    const signer = provider.getSigner()
                    let txn
                    try {
                      txn = await signer.sendTransaction(sendForSwap)
                    } catch (error) {
                      toast.error('failed to generate swap')
                      return
                    }
                    let txnHash = txn.hash

                    toast.info(`Generated swap transaction, waiting for success...`)
                    while (true) {
                      try {
                        // @ts-ignore
                        await (await getChainDetails()).publicClient().waitForTransactionReceipt({ hash: txnHash })
                        break
                      } catch (error) {
                        // async sleep 3 seconds
                        await new Promise((resolve) => setTimeout(resolve, 3000))
                      }
                    }

                    // now send the received ERC-20 token
                    const tokenContract = new ethers.Contract(
                      swapToTokenAddress,
                      ['function transfer(address to, uint256 amount)'],
                      new ethers.providers.Web3Provider((window as any).ethereum)
                    )
                    txnHash = await tokenContract.transfer(address, swapAmount)

                    toast.info(`Generated send transaction, waiting for success...`)
                    while (true) {
                      try {
                        // @ts-ignore
                        await (await getChainDetails()).publicClient().waitForTransactionReceipt({ hash: txnHash })
                        break
                      } catch (error) {
                        // async sleep 3 seconds
                        await new Promise((resolve) => setTimeout(resolve, 3000))
                      }
                    }
                  },
                },
              }
            }
          } else {
            console.log('incorrect chain -- need to bridge')
          }

          break
        }
      } else {
        status = { status: 'unknown' }
      }

      if (status) {
        setTransactionStatus(status)
      } else {
        alert('unknown error')
      }
    })()
  }

  const doSend = async () => {
    toast.success('Transaction successful')
  }

  return (
    <>
      <TabSet />
      <div className="p-4 max-w-md mx-auto mt-8 bg-white shadow-lg rounded-lg mb-8">
        <input
          className="mb-2 p-2 border rounded w-full"
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <div className="flex space-x-2 mb-2">
          <select className="p-2 border rounded w-1/2" value={asset} onChange={(e) => setAsset(e.target.value as AssetType)}>
            <option value="ETH">ETH</option>
            <option value="APE">APE</option>
            <option value="USDC">USDC</option>
            <option value="USDT">USDT</option>
          </select>
          <input className="p-2 border rounded w-1/2" type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </div>
        {transactionStatus?.status !== 'success' && (
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={checkValidity}>
            Check transaction validity
          </button>
        )}
        {transactionStatus && (
          <div className="mt-4">
            {transactionStatus.error && <p className="text-red-500">Error: {transactionStatus.error}</p>}
            {transactionStatus.suggestion && (
              <div className="mt-2">
                <p>{transactionStatus.suggestion.description}</p>
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  onClick={transactionStatus.suggestion.actionFunction}>
                  {transactionStatus.suggestion.actionText}
                </button>
              </div>
            )}
            {transactionStatus.status === 'success' && (
              <div>
                <p className="text-green-500">Proposed transaction confirmed acceptable by recipient</p>
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={doSend}>
                  Send
                </button>
              </div>
            )}
            {transactionStatus.status === 'unknown' && (
              <div>
                <p className="text-orange-500">No information was found to confirm the validity of this transaction</p>
                <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded" onClick={doSend}>
                  Send anyway
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}
