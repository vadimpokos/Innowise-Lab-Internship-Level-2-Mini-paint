import { FeedImage } from '../../components/Feed/types'
import {
    ADD_DATA,
    CLEAR_DATA,
    DELETE_DATA,
    GET_DATA,
} from '../../constants/reduxTypes'
import { IImage } from '../../redux/imagesReducer/types'

export const getImages = (): { type: string } => ({
    type: GET_DATA,
})

export const addImage = (
    payload: IImage
): { type: string; payload: IImage } => ({
    type: ADD_DATA,
    payload,
})

export const deleteImage = (
    payload: FeedImage[]
): { type: string; payload: FeedImage[] } => ({
    type: DELETE_DATA,
    payload,
})

export const clearImagesList = (): { type: string } => {
    return {
        type: CLEAR_DATA,
    }
}
