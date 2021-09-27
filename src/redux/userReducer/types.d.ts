export type State = typeof initialState
export type Action = {
    type: string
    payload: User
}
export type User = firebase.User
