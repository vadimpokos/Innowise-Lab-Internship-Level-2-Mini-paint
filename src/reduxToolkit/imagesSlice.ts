import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IDbImage, Image } from '../redux/imagesReducer/types'

const initialState = {
    images: [] as Image[] | IDbImage[],
}

const imagesSlice = createSlice({
    name: 'images',
    initialState: initialState,
    reducers: {
        setImages: (state, action: { type: string; payload: IDbImage[] }) => ({
            images: action.payload,
        }),
        addImageSuccess: (
            state,
            action: {
                type: string
                payload: {
                    base64: string
                    id: string
                    uid: string
                    username: string
                    avatar: string
                }
            }
        ) => ({ ...state }),
        deleteImageSuccess: (state, action: PayloadAction<Image[]>) => ({
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
        }),
        clearImagesListSuccess: () => ({
            images: [],
        }),
    },
})

export const {
    setImages,
    addImageSuccess,
    deleteImageSuccess,
    clearImagesListSuccess,
} = imagesSlice.actions
export default imagesSlice.reducer
