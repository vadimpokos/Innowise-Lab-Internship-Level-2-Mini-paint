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
        return null
    }
}

export const saveState = (state: { user: { user: User } }): void => {
    try {
        const serializedState = JSON.stringify(state)
        localStorage.setItem('state', serializedState)
    } catch (err) {
        openNotification(err.name, err.message)
    }
    
}
