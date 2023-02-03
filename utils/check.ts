/**
 * @param condition Condition to assert
 * @param message Message used when raising an error
 */
export function assert(condition: boolean, message: string) {
  if (condition) {
    throw Error(message)
  }
}
