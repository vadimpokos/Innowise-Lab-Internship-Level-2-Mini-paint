import firebase from 'firebase'
import { db } from '../firebase/firebase'
import {
    ADD_DATA,
    CLEAR_DATA,
    DELETE_DATA,
    GET_DATA,
    GOOGLE_SIGN_IN,
    LOGOUT,
} from './reduxTypes'
import { Dispatch } from 'redux'
import { openNotification } from '../notification'
import { image } from './imagesReducer'

export interface Iimage {
    avatar?: string
    base64?: string
    id?: string
    uid?: string
    username?: string
}

export interface IdbImage extends Iimage {
    firestoreId: string
}

export const getImages = (): ((
    dispatch: Dispatch<{ type: string; payload: IdbImage[] }>
) => Promise<void>) => {
    return async (
        dispatch: Dispatch<{ type: string; payload: IdbImage[] }>
    ): Promise<void> => {
        const response = db.collection('images').orderBy('id')
        let images: IdbImage[] = []
        try {
            await response
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        images = [
                            { ...doc.data(), firestoreId: doc.id },
                            ...images,
                        ]
                    })
                })
                .then(() => {
                    dispatch({ type: GET_DATA, payload: images })
                })
                .catch((e) => {
                    throw e
                })
        } catch (e) {
            openNotification(e.name, e.message)
        }
    }
}

export const addImage = (
    img: string,
    uid: string,
    username: string,
    avatar: string
): ((
    dispatch: Dispatch<{ type: string; payload: Iimage }>
) => Promise<void>) => {
    return async (
        dispatch: Dispatch<{ type: string; payload: Iimage }>
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
            await response
                .add(imageForDB)
                .then(() => {
                    dispatch({
                        type: ADD_DATA,
                        payload: { ...imageForDB },
                    })
                })
                .catch((error) => {
                    throw error
                })
        } catch (e) {
            openNotification(e.name, e.message)
        }
    }
}

export const deleteImage = (
    img: image
): ((
    dispatch: Dispatch<{ type: string; payload: image[] }>
) => Promise<void>) => {
    return async (
        dispatch: Dispatch<{ type: string; payload: image[] }>
    ): Promise<void> => {
        const response = db.collection('images')
        try {
            await response
                .doc(img.firestoreId)
                .delete()
                .then(() => {
                    console.log('success', 'Image deleted!')
                })
                .then(() => {
                    dispatch({ type: DELETE_DATA, payload: [img] })
                })
                .catch((error) => {
                    throw error
                })
        } catch (e) {
            openNotification(e.name, e.message)
        }
    }
}

export const googleSignIn = (): ((
    dispatch: Dispatch<{ type: string; payload: firebase.User }>
) => Promise<void>) => {
    return async (
        dispatch: Dispatch<{ type: string; payload: firebase.User }>
    ): Promise<void> => {
        const provider = new firebase.auth.GoogleAuthProvider()

        await firebase
            .auth()
            .signInWithPopup(provider)
            .then((result) => {
                const user = result.user
                dispatch({ type: GOOGLE_SIGN_IN, payload: user })
            })
            .catch((e) => {
                openNotification(e.name, e.message)
            })
    }
}

export const logOut = (): ((
    dispatch: Dispatch<{ type: string; payload: Record<string, never> }>
) => Promise<void>) => {
    return async (
        dispatch: Dispatch<{ type: string; payload: Record<string, never> }>
    ): Promise<void> => {
        try {
            await firebase
                .auth()
                .signOut()
                .then(() => {
                    dispatch({ type: LOGOUT, payload: {} })
                })
                .catch((error) => {
                    throw error
                })
        } catch (e) {
            openNotification(e.name, e.message)
        }
    }
}

export const clearImagesList = (): { type: string; payload: [] } => {
    return {
        type: CLEAR_DATA,
        payload: [],
    }
}
