/**
 * Truncates an address inserting ellipsis in the middle
 * @param address
 * @param startLength How many chars to show before the ellipsis
 * @param endLength How many chars to show after the ellipsis
 * @returns Truncated address
 */
export function truncateAddress(
  address: string | null,
  startLength = 6,
  endLength = 4,
): string {
  if (!address) {
    return ''
  }

  return `${address.substring(0, startLength)}...${address.substring(
    address.length - endLength,
  )}`
}
