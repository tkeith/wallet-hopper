import { NextApiRequest, NextApiResponse } from 'next'
import { Web3Storage } from 'web3.storage'

function getAccessToken(): string {
  return process.env.WEB3STORAGE_TOKEN!
}

function makeStorageClient(): Web3Storage {
  return new Web3Storage({ token: getAccessToken() })
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const storageClient = makeStorageClient()
      const data = req.body.data
      const file = new File([data], 'data.txt', { type: 'text/plain' })
      const cid = await storageClient.put([file])
      res.status(200).json({ cid })
    } catch (error) {
      res.status(500).json({ error: 'Error storing data' })
    }
  } else {
    res.status(405).json({ error: 'Only POST requests are allowed' })
  }
}
