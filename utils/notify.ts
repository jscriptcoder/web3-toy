import { notification } from 'antd'

export function notifyError(message: string, error: unknown): void {
  notification.error({
    message,
    description: error instanceof ErrorEvent ? error.message : `${error}`,
  })
}
