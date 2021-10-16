import { createSlice } from '@reduxjs/toolkit'
import { User } from '../redux/userReducer/types'

const initialState: { user: User } = {
    user: {} as User,
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setGoogleUser: (
            state,
            action: {
                type: string
                payload: { uid: string; displayName: string; photoURL: string }
            }
        ) => ({
            ...state,
            user: action.payload,
        }),
        logOutSuccess: () => ({
            user: {},
        }),
    },
})

export const { setGoogleUser, logOutSuccess } = userSlice.actions
export default userSlice.reducer
