import { combineReducers } from 'redux'
import { imagesReducer } from './imagesReducer/reducer'
import { userReducer } from './userReducer/reducer'

export const rootReducer = combineReducers({
    images: imagesReducer,
    user: userReducer,
})

export type RootState = ReturnType<typeof rootReducer>
