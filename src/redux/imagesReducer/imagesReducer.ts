import { ADD_DATA, CLEAR_DATA, DELETE_DATA, GET_DATA } from '../reduxTypes'
import { Iaction, image, init } from './types'

const initialState: init = {
    images: [] as image[],
}

type State = typeof initialState

export const imagesReducer = (state = initialState, action: Iaction): State => {
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
                            (item) => item.id === action.payload[0].id
                        )
                    ),
                    ...state.images.slice(
                        state.images.findIndex(
                            (item) => item.id === action.payload[0].id
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
