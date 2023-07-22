import React, { useState, useEffect } from 'react'
import TabSet from 'components/TabSet'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import { createPublicClient, createWalletClient, custom, http } from 'viem'
import { CHAINS } from './configure'
import { walletHopperAddress } from 'abis'

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

    const publicClient = createPublicClient({
      chain: chain,
      transport: http(),
    })

    const contractAddress = (walletHopperAddress as Record<number, `0x${string}`>)[chainId]
    if (!contractAddress) {
      toast.error('Contract not deployed on this network')
    }

    const [address] = await walletClient.getAddresses()

    return { walletClient, chainId, chain, publicClient, contractAddress, address }
  })

  useEffect(() => {
    setTransactionStatus(null)
  }, [address, asset, amount])

  const checkValidity = () => {
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
          if (preferredAsset.symbol === asset && preferredAsset.chain == (await getChainDetails()).chain.name.toLowerCase()) {
            status = { status: 'success' }
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
      <div className="p-4 max-w-md mx-auto mt-8 bg-white shadow-lg rounded-lg">
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
