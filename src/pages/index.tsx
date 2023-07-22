import React, { useState } from 'react'
import TabSet from 'components/TabSet'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

type AssetType = 'ETH' | 'APE' | 'USDC' | 'USDT'

interface TransactionStatus {
  status: 'success' | 'fail'
  error?: string
  suggestion?: {
    description: string
    actionText: string
    actionFunction: () => void
  }
}

const dummyFunction = (address: string, asset: AssetType, amount: number): TransactionStatus => {
  // Implement your logic here
  return { status: 'success' }
  return {
    status: 'fail',
    error: 'Insufficient balance',
    suggestion: {
      description: 'Buy more tokens',
      actionText: 'Buy',
      actionFunction: () => {
        alert('hi')
      },
    },
  }
}

export default function Home() {
  const [address, setAddress] = useState('')
  const [asset, setAsset] = useState<AssetType>('ETH')
  const [amount, setAmount] = useState(0)
  const [transactionStatus, setTransactionStatus] = useState<TransactionStatus | null>(null)

  const handleSend = () => {
    const status = dummyFunction(address, asset, amount)
    setTransactionStatus(status)
    if (status.status === 'success') {
      console.log('Transaction successful')
      toast.success('Transaction successful')
    }
  }

  return (
    <>
      <TabSet />
      <div className="p-4">
        <input
          className="mb-2 p-2 border rounded w-full"
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <select className="mb-2 p-2 border rounded w-full" value={asset} onChange={(e) => setAsset(e.target.value as AssetType)}>
          <option value="ETH">ETH</option>
          <option value="APE">APE</option>
          <option value="USDC">USDC</option>
          <option value="USDT">USDT</option>
        </select>
        <input
          className="mb-2 p-2 border rounded w-full"
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSend}>
          Send
        </button>
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
