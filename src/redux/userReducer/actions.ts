import firebase from 'firebase'
import { GOOGLE_SIGN_IN, LOGOUT } from '../../constants/reduxTypes'
import { Dispatch } from 'redux'
import { openNotification } from '../../utils/notification'
import { User } from './types'

export const googleSignIn = (): ((
    dispatch: Dispatch<{ type: string; payload: firebase.User }>
) => Promise<void>) => {
    return async (
        dispatch: Dispatch<{ type: string; payload: firebase.User }>
    ): Promise<void> => {
        const provider = new firebase.auth.GoogleAuthProvider()
        try {
            await firebase
                .auth()
                .signInWithPopup(provider)
                .then((result) => {
                    const user = result.user
                    dispatch({
                        type: GOOGLE_SIGN_IN,
                        payload: user || ({} as User),
                    })
                })
                .catch((e) => {
                    throw e
                })
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
