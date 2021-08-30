import { rootReducer } from './rootReducer'
import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { loadState, saveState } from '../localStorage'

const persistedState = loadState()

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(
    rootReducer,
    persistedState,
    composeEnhancers(applyMiddleware(thunk))
)

store.subscribe(() => {
    saveState({
        user: store.getState().user,
    })
})

export type AppDispatch = typeof store.dispatch
