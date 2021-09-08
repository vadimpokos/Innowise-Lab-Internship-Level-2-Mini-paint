import { combineReducers } from 'redux'
import { imagesReducer } from './imagesReducer/imagesReducer'
import { userReducer } from './userReducer/userReducer'

export const rootReducer = combineReducers({
    images: imagesReducer,
    user: userReducer,
})

export type RootState = ReturnType<typeof rootReducer>
