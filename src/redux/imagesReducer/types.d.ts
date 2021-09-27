export interface IImage {
    avatar?: string
    base64?: string
    id?: string
    uid?: string
    username?: string
}

export interface IDbImage extends IImage {
    firestoreId: string
}

export type Image = {
    id: string
    base64: string
    firestoreId: string
    username: string
    avatar: string
    uid: string
}

export type Init = { images: Image[] }

export type Action = {
    type: string
    payload: image[]
}
