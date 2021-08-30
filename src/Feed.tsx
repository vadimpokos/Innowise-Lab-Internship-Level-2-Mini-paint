import { Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ImageItem } from './ImageItem'
import { getImages, Iimage } from './redux/actions'
import { RootState } from './redux/rootReducer'
import { AppDispatch } from './redux/store'

export const Feed = (): JSX.Element => {
    const images = useSelector((state: RootState) => state.images.images)
    const user = useSelector((state: RootState) => state.user.user)
    const dispatch = useDispatch<AppDispatch>()
    const [selectedUser, setSelectedUser] = useState('All')

    useEffect(() => {
        dispatch(getImages())
    }, [dispatch])

    const users = images.reduce(
        (acc: string[], item: Iimage) => {
            if (
                acc.find(
                    (name: string) =>
                        name === item.username ||
                        (name === 'My' && item.uid === user.uid)
                )
            ) {
                return acc
            } else {
                return [...acc, user.uid === item.uid ? 'My' : item.username]
            }
        },
        ['All']
    )

    return (
        <>
            <div>
                <span>Sort by user </span>
                <Select
                    className="users-select"
                    value={selectedUser}
                    onChange={(e) => setSelectedUser(`${e}`)}
                >
                    {users.map((item: string, index: number) => (
                        <Select.Option value={item} key={index}>
                            {item}
                        </Select.Option>
                    ))}
                </Select>
            </div>
            <div className="images-wrapper">
                <h3>{`${selectedUser} images`}</h3>
                {images.map(
                    (item: {
                        id: string
                        base64: string
                        firestoreId: string
                        username: string
                        avatar: string
                        uid: string
                    }) =>
                        item.username === selectedUser ||
                        selectedUser === 'All' ||
                        (selectedUser === 'My' && item.uid === user.uid) ? (
                            <ImageItem {...item} key={item.id} />
                        ) : null
                )}
            </div>
        </>
    )
}
