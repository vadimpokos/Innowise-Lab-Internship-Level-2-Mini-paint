import { Dispatch } from 'redux'
import { db } from '../../firebase/firebase'
import { openNotification } from '../../utils/notification'
import {
    ADD_DATA,
    CLEAR_DATA,
    DELETE_DATA,
    GET_DATA,
} from '../../constants/reduxTypes'
import { IDbImage, IImage, Image } from './types'

export const getImages = (): ((
    dispatch: Dispatch<{ type: string; payload: IDbImage[] }>
) => Promise<void>) => {
    return async (
        dispatch: Dispatch<{ type: string; payload: IDbImage[] }>
    ): Promise<void> => {
        const response = db.collection('images').orderBy('id')
        let images: IDbImage[] = []
        try {
            const query = await response.get()

            query.forEach((doc) => {
                images = [
                    { ...doc.data(), firestoreId: doc.id },
                    ...images,
                ]
            })
            dispatch({ type: GET_DATA, payload: images })

        } catch (e) {
            if (e instanceof Error) {
                openNotification({ message: e.name, description: e.message })
            } else {
                openNotification({
                    message: 'error',
                    description: 'unknown error',
                })
            }
        }
    }
}

export const addImage = (
    img: string,
    uid: string,
    username: string,
    avatar: string
): ((
    dispatch: Dispatch<{ type: string; payload: IImage }>
) => Promise<void>) => {
    return async (
        dispatch: Dispatch<{ type: string; payload: IImage }>
    ): Promise<void> => {
        const response = db.collection('images')
        const imageForDB = {
            base64: img,
            id: `${new Date().getTime()}`,
            uid: uid,
            username: username,
            avatar: avatar,
        }
        try {
            await response.add(imageForDB)

            dispatch({type: ADD_DATA, payload: { ...imageForDB }})

        } catch (e) {
            if (e instanceof Error) {
                openNotification({ message: e.name, description: e.message })
            } else {
                openNotification({
                    message: 'error',
                    description: 'unknown error',
                })
            }
        }
    }
}

export const deleteImage = (
    img: Image
): ((
    dispatch: Dispatch<{ type: string; payload: Image[] }>
) => Promise<void>) => {
    return async (
        dispatch: Dispatch<{ type: string; payload: Image[] }>
    ): Promise<void> => {
        const response = db.collection('images')
        try {
            await response.doc(img.firestoreId).delete()
            dispatch({ type: DELETE_DATA, payload: [img] })
        } catch (e) {
            if (e instanceof Error) {
                openNotification({ message: e.name, description: e.message })
            } else {
                openNotification({
                    message: 'error',
                    description: 'unknown error',
                })
            }
        }
    }
}

export const clearImagesList = (): { type: string; payload: [] } => {
    return {
        type: CLEAR_DATA,
        payload: [],
    }
}
