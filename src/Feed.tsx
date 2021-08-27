import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ImageItem } from './ImageItem'
import { getImages } from './redux/actions'
import { RootState } from './redux/rootReducer'

export const Feed = (): JSX.Element => {
    const images = useSelector((state: RootState) => state.images.images)
    const dispatch = useDispatch()

    useEffect(() => dispatch(getImages()), [])

    return (
        <>
            <div className="images-wrapper">
                <h3>User images</h3>
                {images.map(
                    (item: {
                        id: string
                        base64: string
                        firestoreId: string
                        username: string
                        avatar: string
                        uid: string
                    }) => (
                        <ImageItem {...item} key={item.id} />
                    )
                )}
            </div>
        </>
    )
}
