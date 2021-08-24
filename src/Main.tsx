import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Paint } from './Paint'
import { getImages } from './redux/actions'
import { RootState } from './redux/rootReducer'

export const Main = (): JSX.Element => {
    const dispatch = useDispatch()
    const images = useSelector((state: RootState) => state.images.images)

    useEffect(() => dispatch(getImages()), [])

    return (
        <>
            <Paint />
            <div>
                <h3>My images from db</h3>
                {images.map((item: { id: React.Key; base64: string }) => (
                    <img key={item.id} src={item.base64} />
                ))}
            </div>
        </>
    )
}
