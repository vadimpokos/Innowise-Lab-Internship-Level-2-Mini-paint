export interface Iimage {
    avatar?: string
    base64?: string
    id?: string
    uid?: string
    username?: string
}

export interface IdbImage extends Iimage {
    firestoreId: string
}

export type image = {
    id: string
    base64: string
    firestoreId: string
    username: string
    avatar: string
    uid: string
}

export type init = { images: image[] }

export type Iaction = {
    type: string
    payload: image[]
}
