import { configureStore } from '@reduxjs/toolkit'
import { loadState, saveState } from '../services/LocalStorage'
import createSagaMiddleware from '@redux-saga/core'
import userSlice from './userSlice'
import imagesSlice from './imagesSlice'
import rootSaga from './sagas/rootSaga'

const sagaMiddleware = createSagaMiddleware()

const persistedState = loadState()

export const store = configureStore({
    reducer: { images: imagesSlice, user: userSlice },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: false,
            serializableCheck: false,
        }).concat(sagaMiddleware),
    preloadedState: persistedState,
})

sagaMiddleware.run(rootSaga)

store.subscribe(() => {
    saveState({
        user: store.getState().user,
    })
})
