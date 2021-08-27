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

export const getImages = (): any => {
    return async (
        dispatch: (arg0: { type: string; payload: any[] }) => void
    ) => {
        const response = db
            .collection('images')
            // .where('uid', '==', uid)
            .orderBy('id')
        let images: any[] = []
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
            console.log(e)
        }
    }
}

export const addImage = (
    img: string,
    uid: string,
    username: string,
    avatar: string
): any => {
    return async (
        dispatch: (arg0: {
            type: string
            payload: {
                base64: string
                id: number
                uid: string
                username: string
                avatar: string
            }
        }) => void
    ) => {
        const response = db.collection('images')
        const image = {
            base64: img,
            id: new Date().getTime(),
            uid: uid,
            username: username,
            avatar: avatar,
        }
        try {
            await response
                .add(image)
                .then(() => {
                    dispatch({
                        type: ADD_DATA,
                        payload: { ...image },
                    })
                })
                .catch((error) => {
                    throw error
                })
        } catch (e) {
            console.log('error', 'Error adding document', e.message)
        }
    }
}

export const deleteImage = (docId: string, id: string): any => {
    return async (dispatch: (arg0: { type: string; payload: any }) => void) => {
        const response = db.collection('images')
        try {
            await response
                .doc(docId)
                .delete()
                .then(() => {
                    console.log('success', 'Image deleted!')
                })
                .then(() => {
                    dispatch({ type: DELETE_DATA, payload: id })
                })
                .catch((error) => {
                    throw error
                })
        } catch (e) {
            console.log(e)
        }
    }
}

export const googleSignIn = (): any => {
    return async (
        dispatch: (arg0: { type: string; payload: firebase.User }) => void
    ) => {
        const provider = new firebase.auth.GoogleAuthProvider()

        await firebase
            .auth()
            .signInWithPopup(provider)
            .then((result) => {
                const user = result.user
                dispatch({ type: GOOGLE_SIGN_IN, payload: user })
            })
            .catch((error) => {
                console.log('error', 'Login error', error.message)
            })
    }
}

export const logOut = (): any => {
    return async (dispatch: (arg0: { type: string; payload: any }) => void) => {
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
            console.log('error', 'LogOut error', e.message)
        }
    }
}

export const clearImagesList = (): any => {
    return {
        type: CLEAR_DATA,
        payload: [],
    }
}
