export async function getPrice(
  id: string,
  fiat: string,
): Promise<PriceData | ErrorData> {
  const response = await fetch(
    `/api/price?id=${encodeURIComponent(id)}&fiat=${encodeURIComponent(fiat)}`,
  )
  const data = await response.json()
  return data
}
