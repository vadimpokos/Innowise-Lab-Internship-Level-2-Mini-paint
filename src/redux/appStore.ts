import { rootReducer } from './rootReducer'
import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { loadState, saveState } from '../services/LocalStorage'
import { customMiddleware } from './customMiddleware/customMiddleware'

const persistedState = loadState()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(
    rootReducer,
    persistedState,
    composeEnhancers(applyMiddleware(thunk, customMiddleware))
)

store.subscribe(() => {
    saveState({
        user: store.getState().user,
    })
})
