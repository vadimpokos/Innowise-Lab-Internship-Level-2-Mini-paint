import React from 'react'
import { Avatar, Card } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/rootReducer'
import { IFeedImage } from './types'
import { deleteImage } from '../redux/imagesReducer/actions'

export const ImageItem = (item: IFeedImage): JSX.Element => {
    const dispatch = useDispatch()

    const user = useSelector((state: RootState) => state.user.user)
    const handleButtonDelete = (): void => {
        dispatch(deleteImage(item))
    }

    return (
        <Card
            key={item.id}
            cover={<img src={item.base64} />}
            actions={[
                user.uid === item.uid ? (
                    <DeleteOutlined
                        key={item.id}
                        onClick={handleButtonDelete}
                    />
                ) : null,
            ]}
        >
            <Card.Meta
                avatar={<Avatar src={item.avatar} />}
                title={item.username}
            />
        </Card>
    )
}
