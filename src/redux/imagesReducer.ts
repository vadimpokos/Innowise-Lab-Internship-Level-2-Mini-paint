import { ADD_DATA, GET_DATA } from './reduxTypes'

export type image = {
    base64: string
    id: string
}

type init = { images: image[] }

type action = {
    type: string
    payload: unknown
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
        default:
            return state
    }
}
