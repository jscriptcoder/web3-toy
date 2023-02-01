// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type QueryParams = {
  id: string
  fiat: string
}

type DataFromCoinGecko = {
  [id: string]: { [fiat: string]: number }
}

type PriceData = { price: number }
type ErrorData = { error: string }

const COINGECKO_API = 'https://api.coingecko.com/api/v3'

export default async function getPrice(
  req: NextApiRequest,
  res: NextApiResponse<PriceData | ErrorData>,
) {
  const { id, fiat } = req.query as QueryParams

  try {
    const response = await fetch(
      `${COINGECKO_API}/simple/price?ids=${id}&vs_currencies=${fiat}`,
    )

    if (response.status >= 400) {
      throw Error(`CoinGecko failed with status: ${response.status}`)
    }

    const data = (await response.json()) as DataFromCoinGecko
    const price = data[id][fiat]

    res.json({ price })
  } catch (error) {
    res.status(500).json({ error: `${error}` })
  }
}
