import { GOOGLE_SIGN_IN, LOGOUT } from './reduxTypes'
import firebase from 'firebase'

export type User = firebase.User

const initialState: { user: User } = {
    user: {} as User,
}

type State = typeof initialState
type Action = {
    type: string
    payload: User
}

export const userReducer = (state = initialState, action: Action): State => {
    switch (action.type) {
        case GOOGLE_SIGN_IN:
            return { ...state, user: action.payload }
        case LOGOUT:
            return { user: action.payload }
        default:
            return state
    }
}
