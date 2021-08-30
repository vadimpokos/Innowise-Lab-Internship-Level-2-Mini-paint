import { ADD_DATA, CLEAR_DATA, DELETE_DATA, GET_DATA } from './reduxTypes'

export type image = {
    base64: string
    id: string
}

type init = { images: image[] }

type action = {
    type: string
    payload: never
}

const initialState: init = {
    images: [],
}

export const imagesReducer = (state = initialState, action: action): any => {
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
                            (item) => item.id === action.payload
                        )
                    ),
                    ...state.images.slice(
                        state.images.findIndex(
                            (item) => item.id === action.payload
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
