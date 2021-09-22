import { notification } from 'antd'
import { NotificationPlacement } from 'antd/lib/notification'

interface INotification {
    message: string
    description: string
    placement?: NotificationPlacement | undefined
}

export const openNotification = ({
    message,
    description,
    placement = 'bottomLeft',
}: INotification): void => {
    notification.error({
        message: message,
        description: description,
        placement: placement,
    })
}
