import { RootState } from '../../redux/rootReducer'
import { User } from '../../redux/userReducer/types'
import { openNotification } from '../../utils/notification'

export const loadState = (): RootState => {
    try {
        const serializedState = localStorage.getItem('state')
        if (serializedState === null) {
            return { user: { user: {} } } as RootState
        }
        return JSON.parse(serializedState)
    } catch (err) {
        return {} as RootState
    }
}

export const saveState = (state: { user: { user: User } }): void => {
    try {
        const serializedState = JSON.stringify(state)
        localStorage.setItem('state', serializedState)
    } catch (e) {
        if (e instanceof Error) {
            openNotification({ message: e.name, description: e.message })
        } else {
            openNotification({ message: 'error', description: 'unknown error' })
        }
    }
}
