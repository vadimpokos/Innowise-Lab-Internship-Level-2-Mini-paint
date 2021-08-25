import { GOOGLE_SIGN_IN, LOGOUT } from './reduxTypes'

const initialState = {
    user: {},
}

export const userReducer = (state = initialState, action: any): any => {
    switch (action.type) {
        case GOOGLE_SIGN_IN:
            return { ...state, user: action.payload }
        case LOGOUT:
            return { user: action.payload }
        default:
            return state
    }
}
