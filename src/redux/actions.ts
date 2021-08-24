import { db } from '../firebase/firebase'
import { ADD_DATA, GET_DATA } from './reduxTypes'

export const getImages = (): any => {
    return async (
        dispatch: (arg0: { type: string; payload: any[] }) => void
    ) => {
        const response = db.collection('images')
        let images: any[] = []
        try {
            await response
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        images = [...images, doc.data()]
                    })
                })
                .then(() => {
                    dispatch({ type: GET_DATA, payload: images })
                })
                .catch((e) => {
                    throw e
                })
        } catch (e) {
            console.log(e)
        }
    }
}

export const addImage = (img: string): any => {
    return async (
        dispatch: (arg0: {
            type: string
            payload: { base64: string; id: number }
        }) => void
    ) => {
        const response = db.collection('images')
        const image = {
            base64: img,
            id: new Date().getTime(),
        }
        try {
            await response
                .add(image)
                .then(() => {
                    dispatch({ type: ADD_DATA, payload: image })
                })
                .catch((error) => {
                    throw error
                })
        } catch (e) {
            console.log('error', 'Error adding document', e.message)
        }
    }
}
