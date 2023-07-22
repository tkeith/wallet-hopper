import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { WalletClient, createPublicClient, createWalletClient, custom, http } from 'viem'
import { mainnet, polygon } from 'viem/chains'
import { walletHopperABI, walletHopperAddress } from 'abis'
import * as chains from 'viem/chains'
import { Web3Button } from '@web3modal/react'
import { EAS, Offchain, SchemaEncoder, TypedDataSigner } from '@ethereum-attestation-service/eas-sdk'
import { useSearchParams } from 'react-router-dom'
import { ethers } from 'ethers'
import { useWalletClient } from 'wagmi'

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

const Attest: React.FC = () => {
  const [connected, setConnected] = useState(false)

  const getChainDetails = memoizeAsync(async function () {
    const walletClient = createWalletClient({
      transport: custom((window as any).ethereum),
    })

    const chainId = await walletClient.getChainId()

    const contractAddress = (walletHopperAddress as Record<number, `0x${string}`>)[chainId]
    if (!contractAddress) {
      toast.error('Contract not deployed on this network')
    }

    const [address] = await walletClient.getAddresses()

    return { walletClient, chainId, contractAddress, address }
  })

  useEffect(() => {
    getChainDetails()
  }, [])

  // get primaryAddress from end of url after 'primaryAddress='
  const primaryAddress = window.location.href.split('primaryAddress=')[1]

  const generateAttestation = async () => {
    const eas = new Offchain(
      {
        address: '0x0000000000000000000000000000000000000000',
        chainId: (await getChainDetails()).chainId,
        version: '0.26',
      },
      1
    )

    const schemaEncoder = new SchemaEncoder('address primaryAddress')
    const encoded = schemaEncoder.encodeData([
      {
        name: 'primaryAddress',
        type: 'address',
        value: primaryAddress!,
      },
    ])

    const { walletClient, address } = await getChainDetails()

    // const signer = walletClientToSigner(walletClient)
    // const signer = new BrowserProvider((window as any).ethereum).getSigner()

    const signer = new ethers.providers.Web3Provider((window as any).ethereum).getSigner()

    const attestation = await eas.signOffchainAttestation(
      {
        recipient: '0x0000000000000000000000000000000000000000',
        data: encoded,
        refUID: '0x0000000000000000000000000000000000000000000000000000000000000000',
        revocable: true,
        expirationTime: 0,
        schema: '0x7bc09e2be66caf842f5263e969d398346777e8c3d513b4ef090c52f446d81b57',
        version: 1,
        time: Math.floor(Date.now() / 1000),
      },
      signer as unknown as TypedDataSigner
    )

    const attestedData = JSON.stringify(attestation)

    return {
      attestedWallet: (await getChainDetails()).address,
      attestation: attestedData,
    }
  }

  const handleAttest = async () => {
    const attestation = await generateAttestation()
    console.log('attestation: ', attestation)
    const preEncodedString = JSON.stringify(attestation)
    console.log('preEncodedString: ', preEncodedString)
    document.cookie = `attestation=${encodeURIComponent(preEncodedString)}; path=/; domain=wallethopper.com;`
    toast.success('Attestation generated')
    // close window after 1 second
    setTimeout(() => {
      window.close()
      // replace body with a "close this window" message
      document.body.innerHTML = '<p>Attestation generated. You can close this window.</p>'
    }, 2000)
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Generate Attestation</h1>

      <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={handleAttest}>
        Attest
      </button>

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
  )
}

export default Attest
