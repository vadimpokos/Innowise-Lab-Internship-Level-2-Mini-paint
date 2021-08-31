import { ADD_DATA, CLEAR_DATA, DELETE_DATA, GET_DATA } from './reduxTypes'

export type image = {
    id: string
    base64: string
    firestoreId: string
    username: string
    avatar: string
    uid: string
}

type init = { images: image[] }

export type action = {
    type: string
    payload: image[]
}

const initialState: init = {
    images: [] as image[],
}

type State = typeof initialState

export const imagesReducer = (state = initialState, action: action): State => {
    switch (action.type) {
        case GET_DATA:
            return { images: action.payload }
        case ADD_DATA:
            return { ...state }
        case DELETE_DATA:
            return {
                ...state,
                images: [
                    ...state.images.slice(
                        0,
                        state.images.findIndex(
                            (item) => item.id === action.payload[0].firestoreId
                        )
                    ),
                    ...state.images.slice(
                        state.images.findIndex(
                            (item) => item.id === action.payload[0].firestoreId
                        ) + 1
                    ),
                ],
            }
        case CLEAR_DATA:
            return { images: action.payload }
        default:
            return state
    }
}
