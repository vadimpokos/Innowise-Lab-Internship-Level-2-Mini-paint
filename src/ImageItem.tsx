import React from 'react'
import { Avatar, Card } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { deleteImage } from './redux/actions'
import { RootState } from './redux/rootReducer'

export const ImageItem = (item: {
    id: string
    base64: string
    firestoreId: string
    username: string
    avatar: string
    uid: string
}): JSX.Element => {
    const dispatch = useDispatch()

    const user = useSelector((state: RootState) => state.user.user)

    return (
        <Card
            key={item.id}
            cover={<img src={item.base64} />}
            actions={[
                user.uid === item.uid ? (
                    <DeleteOutlined
                        key={item.id}
                        onClick={() =>
                            dispatch(deleteImage(item.firestoreId, item.id))
                        }
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
