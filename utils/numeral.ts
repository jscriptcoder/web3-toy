export function toLocalePrice(num: number | string, decimals = 2): string {
  return Number(Number(num).toFixed(decimals)).toLocaleString()
}
