import { notification } from 'antd'

/**
 *
 * @param message Message to display in the notification
 * @param error This is the error raised
 */
export function notifyError(message: string, error: any): void {
  notification.error({
    message,
    description: 'message' in error ? error.message : `${error}`,
  })
}
