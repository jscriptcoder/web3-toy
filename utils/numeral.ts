/**
 * Converts an amount into a "human readable" figure.
 * @param num The amount to convert
 * @param decimals How many decimals we want to display
 * @param locales Defaults to en-US
 * @returns Human readable amount or price
 */
export function toLocalePrice(
  num: number | string,
  decimals = 2,
  locales = 'en-US',
): string {
  return Number(Number(num).toFixed(decimals)).toLocaleString(locales)
}
