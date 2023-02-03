/**
 * Queries our proxy server for price
 * @param id Id of the coin or token
 * @param fiat Currency we want to convert to
 * @returns current price of that token in the given fiat curreny
 */
export async function getPrice(
  id: string,
  fiat: string,
): Promise<ResponseData> {
  const [encodedId, encodedFiat] = [
    encodeURIComponent(id),
    encodeURIComponent(fiat),
  ]

  const response = await fetch(`/api/price?id=${encodedId}&fiat=${encodedFiat}`)
  const data: ResponseData = await response.json()

  return data
}
