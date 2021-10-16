import { GOOGLE_SIGN_IN, LOGOUT } from '../../constants/reduxTypes'

export const googleSignIn = (): { type: string } => ({ type: GOOGLE_SIGN_IN })

export const logOut = (): { type: string } => ({
    type: LOGOUT,
})
