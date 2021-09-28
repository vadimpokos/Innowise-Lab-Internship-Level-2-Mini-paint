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
            const result = await firebase
                .auth()
                .signInWithPopup(provider)
                const user = result.user
                dispatch({type: GOOGLE_SIGN_IN, payload: user || ({} as User)})
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
                dispatch({ type: LOGOUT, payload: {} })
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
