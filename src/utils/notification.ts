import { notification } from 'antd'

export const openNotification = (
    message: string,
    description: string
): void => {
    notification.error({
        message: message,
        description: description,
        placement: 'bottomLeft',
    })
}
