import { Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ImageItem } from '../ImageItem'
import { RootState } from '../../../redux/rootReducer'
import { FeedImage } from '../types'
import { getImages } from '../../../redux/imagesReducer/actions'
import * as S from './styles'
import { SelectValue } from 'antd/lib/select'

const FeedComponent = (): JSX.Element => {
    const images = useSelector((state: RootState) => state.images.images)
    const user = useSelector((state: RootState) => state.user.user)
    const dispatch = useDispatch()
    const [selectedUser, setSelectedUser] = useState('All')

    useEffect(() => {
        dispatch(getImages())
    }, [dispatch])

    const handleUserSelect = (e: SelectValue): void => {
        setSelectedUser(`${e}`)
    }

    const users = images.reduce(
        (acc: string[], item: FeedImage) => {
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
                <S.UsersSelect
                    className="users-select"
                    value={selectedUser}
                    onChange={handleUserSelect}
                >
                    {users.map((item: string, index: number) => (
                        <Select.Option value={item} key={index}>
                            {item}
                        </Select.Option>
                    ))}
                </S.UsersSelect>
            </div>
            <S.ImagesWrapper>
                <h3>{`${selectedUser} images`}</h3>
                {images.map((item: FeedImage) =>
                    item.username === selectedUser ||
                    selectedUser === 'All' ||
                    (selectedUser === 'My' && item.uid === user.uid) ? (
                        <ImageItem {...item} key={item.id} />
                    ) : null
                )}
            </S.ImagesWrapper>
        </>
    )
}

export const Feed = React.memo(FeedComponent)
