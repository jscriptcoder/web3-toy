import { notification } from 'antd'

export function notifyError(message: string, error: any): void {
  notification.error({
    message,
    description: 'message' in error ? error.message : `${error}`,
  })
}
