import { all, call, put, takeEvery } from '@redux-saga/core/effects'
import firebase from 'firebase'
import { GOOGLE_SIGN_IN, LOGOUT } from '../../constants/reduxTypes'
import { openNotification } from '../../utils/notification'
import { logOutSuccess, setGoogleUser } from '../userSlice'

const signInApi = async (): Promise<firebase.auth.UserCredential> => {
    const provider = new firebase.auth.GoogleAuthProvider()
    return await firebase.auth().signInWithPopup(provider)
}

const signOutApi = async (): Promise<void> => {
    return await firebase.auth().signOut()
}

function* workerGoogleSignIn(): Generator {
    try {
        const result = yield call(signInApi)
        const { user } = result as firebase.auth.UserCredential
        const uid = user?.uid ? user.uid : ''
        const displayName = user?.displayName ? user.displayName : ''
        const photoURL = user?.photoURL ? user.photoURL : ''
        if (user) {
            yield put(
                setGoogleUser({
                    uid: uid,
                    displayName: displayName,
                    photoURL: photoURL,
                })
            )
        }
    } catch (e) {
        if (e instanceof Error) {
            openNotification({ message: e.name, description: e.message })
        } else {
            openNotification({
                message: 'error',
                description: 'unknown error',
            })
        }
    }
}

function* workerLogout(): Generator {
    try {
        yield call(signOutApi)
        yield put(logOutSuccess())
    } catch (e) {
        if (e instanceof Error) {
            openNotification({ message: e.name, description: e.message })
        } else {
            openNotification({
                message: 'error',
                description: 'unknown error',
            })
        }
    }
}

function* watchGoogleSignIn(): Generator {
    yield takeEvery(GOOGLE_SIGN_IN, workerGoogleSignIn)
}

function* watchLogOut(): Generator {
    yield takeEvery(LOGOUT, workerLogout)
}

export default function* userSaga(): Generator {
    yield all([watchGoogleSignIn(), watchLogOut()])
}
