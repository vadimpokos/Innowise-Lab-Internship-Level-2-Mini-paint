import { Middleware } from 'redux'
import { RootState } from '../rootReducer'

export const customMiddleware: Middleware<RootState> =
    () => (next) => (action) => {
        console.log('Middleware triggered:', action.type)
        next(action)
    }
