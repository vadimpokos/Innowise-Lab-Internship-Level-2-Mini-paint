import { GOOGLE_SIGN_IN, LOGOUT } from '../../constants/reduxTypes'
import { User, State, Action } from './types'

const initialState: { user: User } = {
    user: {} as User,
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
