import { combineReducers } from 'redux'
import { imagesReducer } from './imagesReducer'
import { userReducer } from './userReducer'

export const rootReducer = combineReducers({
    images: imagesReducer,
    user: userReducer,
})

export type RootState = ReturnType<typeof rootReducer>
