import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const blockchain = 'polygon'
    const tokenAddress = '0x74156E7CCe407169797053E1A1A17B0C1F920a90'
    const userAddress = req.query.userAddress as string

    const airstackRes = await axios({
      method: 'post',
      url: 'https://api.airstack.xyz/gql',
      headers: {
        Accept: 'application/json, multipart/mixed',
        'Accept-Language': 'en-US,en;q=0.9',
        Authorization: process.env.AIRSTACK_API_KEY!,
        'Content-Type': 'application/json',
      },
      data: {
        query: `query Q1 {
          TokenBalances(
            input: {
              filter: {
                tokenAddress: {_eq: "${tokenAddress}"},
                owner: {_eq: "${userAddress}"}
              },
              blockchain: ${blockchain}
            }
          ) {
            TokenBalance {
              owner {
                addresses
              }
              tokenNfts {
                tokenURI
              }
            }
          }
        }`,
        operationName: 'Q1',
      },
      withCredentials: true,
    })

    console.log('airstackRes.data', airstackRes.data)

    let data: string = '{}'

    if (airstackRes.data.data.TokenBalances.TokenBalance && airstackRes.data.data.TokenBalances.TokenBalance.length > 0) {
      const tokenURI = airstackRes.data.data.TokenBalances.TokenBalance[0].tokenNfts.tokenURI
      const pointerIndex = tokenURI.indexOf('&pointer=') + '&pointer='.length
      const pointerValue = tokenURI.substring(pointerIndex)
      if (pointerValue.startsWith('data:')) {
        // return the raw data
        data = pointerValue.substring('data:'.length)
      } else if (pointerValue.startsWith('ipfs:')) {
        // fetch the data from ipfs
        const ipfsHash = pointerValue.substring('ipfs:'.length)
        const ipfsRes = await axios({
          method: 'get',
          url: `https://ipfs.io/ipfs/${ipfsHash}/data.txt`,
          transformResponse: (r) => r,
        })
        const text = ipfsRes.data
        data = text
      }
    }

    res.json({ data: data })
  } else {
    res.status(405).json({ error: 'Only GET requests are allowed' })
  }
}
