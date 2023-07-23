import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { createPublicClient, createWalletClient, custom, http } from 'viem'
import { mainnet, polygon } from 'viem/chains'
import { walletHopperABI, walletHopperAddress } from 'abis'
import * as chains from 'viem/chains'
import Modal from 'react-modal'
import TabSet from 'components/TabSet'
import * as misc from '../misc'
import { configureChains } from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'

export const CHAINS: Record<number, chains.Chain> = {
  [137]: chains.polygon,
  [1]: chains.mainnet,
  [1101]: chains.polygonZkEvm,
  [100]: chains.gnosis,
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

const RecipientPreferences: React.FC = () => {
  const [jsonInput, setJsonInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [modalIsOpen, setIsOpen] = useState(false)
  const [attestation, setAttestation] = useState(null)

  const getChainDetails = memoizeAsync(async function () {
    const walletClient = createWalletClient({
      transport: custom((window as any).ethereum),
    })

    const chainId = await walletClient.getChainId()

    const chain = CHAINS[chainId]

    const publicClient = () =>
      configureChains([chain], [alchemyProvider({ apiKey: 'wFen0yW-EwjPyr49Cyg2x2nNARSt7Os0' })]).publicClient({ chainId: chainId })

    // createPublicClient({
    //   chain: chain,
    //   transport: http(),
    // })

    // configureChains(

    const contractAddress = (walletHopperAddress as Record<number, `0x${string}`>)[chainId]
    if (!contractAddress) {
      toast.error('Contract not deployed on this network')
    }

    const [address] = await walletClient.getAddresses()

    return { walletClient, chainId, chain, publicClient, contractAddress, address }
  })

  useEffect(() => {
    ;(async function () {
      const { walletClient, chainId, chain, publicClient, contractAddress, address } = await getChainDetails()
      const response = await axios.get('/api/wallet-meta', {
        params: {
          userAddress: address,
        },
      })
      if (response.data && (JSON.parse(response.data.data) as any).timestamp) {
        const jsonData = JSON.parse(response.data.data)
        jsonData.timestamp = new Date().toISOString()
        setJsonInput(JSON.stringify(jsonData, null, 2))
      } else {
        setJsonInput(
          JSON.stringify(
            {
              timestamp: new Date().toISOString(),
              primaryAddress: address,
              preferredAssets: [{ chain: 'ethereum', address: address, symbol: 'ETH' }],
              addresses: [address],
              attestations: {},
            },
            null,
            2
          )
        )
      }
    })()
  }, [])

  const getData = () => {
    try {
      return JSON.parse(jsonInput)
    } catch (error) {
      toast.error('Invalid JSON')
      return null
    }
  }

  async function updateOnChainPointer(cid: string) {
    const { walletClient, chainId, chain, publicClient, contractAddress, address } = await getChainDetails()
    const txnHash = await walletClient.writeContract({
      account: address,
      address: contractAddress,
      abi: walletHopperABI,
      chain: chain,
      functionName: 'setPointer',
      args: ['ipfs:' + cid],
    })
    toast.info(`Generated transaction, waiting for success...`)
    while (true) {
      try {
        await publicClient().waitForTransactionReceipt({ hash: txnHash })
        break
      } catch (error) {
        // async sleep 3 seconds
        await new Promise((resolve) => setTimeout(resolve, 3000))
      }
    }
    return { txnHash }
  }

  const saveData = async (data: any) => {
    const { chain } = await getChainDetails()
    try {
      setIsLoading(true)
      const response = await axios.post('/api/store', { data: JSON.stringify(data, null, 2) })
      toast.info(`Successfully stored to IPFS: ${response.data.cid}`)
      const res = await updateOnChainPointer(response.data.cid)
      if (!res) {
        toast.error('Error putting pointer on chain')
      } else {
        const { txnHash } = res
        toast.success(
          <>
            <a target="_blank" rel="noreferrer" href={chain.blockExplorers!.default.url + '/tx/' + txnHash}>
              Successfully updated on-chain pointer. Txn: {txnHash}
            </a>
          </>
        )
      }
    } catch (error) {
      toast.error('Error storing data')
      console.log(error)
      console.log((error as any).stack)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = () => {
    const data = getData()
    if (data !== null) {
      saveData(data)
    }
  }

  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }

  const handleAddAttestation = async () => {
    openModal()
    window.open('https://attest.wallethopper.com/attest?primaryAddress=' + (await getChainDetails()).address, '_blank')
    setIsLoading(true)
    const checkCookie = setInterval(() => {
      const attestationCookie = document.cookie.split('; ').find((row) => row.startsWith('attestation'))
      if (attestationCookie) {
        const attestationValue = attestationCookie.split('=')[1]
        setAttestation(JSON.parse(decodeURIComponent(attestationValue)))
        setIsLoading(false)
        clearInterval(checkCookie)
        // Delete the attestation cookie after using it
        document.cookie = 'attestation=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=wallethopper.com;'
      }
    }, 1000)
  }

  const handleConfirmAttestation = () => {
    const data = getData()
    if (data !== null) {
      data.attestations = data.attestations || {}
      // @ts-ignore
      data.attestations[attestation.attestedWallet] = attestation.attestation
      setJsonInput(JSON.stringify(data, null, 2))
      closeModal()
      toast.success('Attestation added successfully')
    }
  }

  return (
    <>
      <TabSet />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Configure Recipient Preferences</h1>
        <button className="px-4 py-2 bg-blue-500 text-white rounded mb-4" onClick={handleAddAttestation}>
          Add attestation
        </button>
        <textarea className="w-full h-64 p-2 border rounded mb-4" value={jsonInput} onChange={(e) => setJsonInput(e.target.value)} />
        <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={handleSave} disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save preferences'}
        </button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Attestation Modal"
          className="p-4 bg-white rounded shadow-lg outline-none mx-auto"
          style={{
            overlay: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            },
            content: {
              width: '800px',
              overflow: 'hidden',
            },
          }}>
          {isLoading
            ? 'Waiting for attestation...'
            : attestation && (
                <div style={{ overflow: 'auto', maxHeight: '350px' }}>
                  <h2 className="text-xl font-bold mb-2">Attestation</h2>
                  <pre className="bg-gray-100 p-2 rounded">{JSON.stringify(attestation, null, 2)}</pre>
                  <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={handleConfirmAttestation}>
                    Confirm
                  </button>
                </div>
              )}
        </Modal>
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
      </div>
    </>
  )
}

export default RecipientPreferences
