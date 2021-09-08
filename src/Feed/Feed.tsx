import { Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ImageItem } from './ImageItem'
import { RootState } from '../redux/rootReducer'
import { IFeedImage } from './types'
import { getImages } from '../redux/imagesReducer/actions'

export const Feed = (): JSX.Element => {
    const images = useSelector((state: RootState) => state.images.images)
    const user = useSelector((state: RootState) => state.user.user)
    const dispatch = useDispatch()
    const [selectedUser, setSelectedUser] = useState('All')

    useEffect(() => {
        dispatch(getImages())
    }, [dispatch])

    const handleUserSelect = (e: string): void => {
        setSelectedUser(`${e}`)
    }

    const users = images.reduce(
        (acc: string[], item: IFeedImage) => {
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
                    onChange={handleUserSelect}
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
                {images.map((item: IFeedImage) =>
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
