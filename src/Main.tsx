import { Button, Card } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Paint } from './Paint'
import {
    clearImagesList,
    deleteImage,
    getImages,
    logOut,
} from './redux/actions'
import { RootState } from './redux/rootReducer'

export const Main = (): JSX.Element => {
    const dispatch = useDispatch()
    const images = useSelector((state: RootState) => state.images.images)

    useEffect(() => dispatch(getImages()), [])

    return (
        <>
            <Button
                id="logout-button"
                onClick={() => {
                    dispatch(logOut())
                    dispatch(clearImagesList())
                }}
            >
                Logout
            </Button>
            <Paint />
            <div className="images-wrapper">
                <h3>My images from db</h3>
                {images.map(
                    (item: {
                        id: string
                        base64: string
                        firestoreId: string
                    }) => (
                        <Card
                            key={item.id}
                            cover={<img src={item.base64} />}
                            actions={[
                                <DeleteOutlined
                                    key="setting"
                                    onClick={() =>
                                        dispatch(
                                            deleteImage(
                                                item.firestoreId,
                                                item.id
                                            )
                                        )
                                    }
                                />,
                            ]}
                        ></Card>
                    )
                )}
            </div>
        </>
    )
}
