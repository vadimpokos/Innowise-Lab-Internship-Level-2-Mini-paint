import { db } from '../../firebase/firebase'
import { takeEvery, call, put } from '@redux-saga/core/effects'
import { IDbImage } from '../../redux/imagesReducer/types'

import { openNotification } from '../../utils/notification'
import { AnyAction, Action } from 'redux'
import {
    ADD_DATA,
    CLEAR_DATA,
    DELETE_DATA,
    GET_DATA,
} from '../../constants/reduxTypes'
import { all } from 'redux-saga/effects'
import firebase from 'firebase'
import { FeedImage } from '../../components/Feed/types'
import {
    addImageSuccess,
    clearImagesListSuccess,
    deleteImageSuccess,
    setImages,
} from '../imagesSlice'

interface DeleteAction extends Action {
    [extraProps: string]: FeedImage[]
}

const getImagesApi = async (): Promise<firebase.firestore.QuerySnapshot> => {
    const collection = db.collection('images').orderBy('id')
    return await collection.get()
}

const deleteImagesApi = async (dbId: string): Promise<void> => {
    const response = db.collection('images').doc(dbId)
    return await response.delete()
}

const addImageApi = async (image: {
    base64: string
    id: string
    uid: string
    username: string
    avatar: string
}): Promise<firebase.firestore.DocumentReference> => {
    const response = db.collection('images')
    return await response.add(image)
}

function* workerGetImages(): Generator {
    try {
        let images: IDbImage[] = []
        const response: any = yield call(getImagesApi)
        response.forEach((doc: { data: () => IDbImage; id: string }) => {
            images = [{ ...doc.data(), firestoreId: doc.id }, ...images]
        })
        yield put(setImages(images))
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

function* workerAddImage(payload: AnyAction): Generator {
    try {
        const imageForDB = {
            base64: payload.payload.base64,
            id: `${new Date().getTime()}`,
            uid: payload.payload.uid,
            username: payload.payload.username,
            avatar: payload.payload.avatar,
        }
        yield call(addImageApi, imageForDB)
        yield put(addImageSuccess({ ...imageForDB }))
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

function* workerDeleteImage(payload: DeleteAction): Generator {
    console.log(payload.payload[0])
    try {
        yield call(deleteImagesApi, payload.payload[0].firestoreId)
        yield put(deleteImageSuccess(payload.payload))
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

function* workerClearImagesList(): Generator {
    yield put(clearImagesListSuccess())
}

function* watchGetImages(): Generator {
    yield takeEvery(GET_DATA, workerGetImages)
}

function* watchAddImage(): Generator {
    yield takeEvery(ADD_DATA, workerAddImage)
}

function* watchDeleteImage(): Generator {
    yield takeEvery(DELETE_DATA, workerDeleteImage)
}

function* watchClearImagesList(): Generator {
    yield takeEvery(CLEAR_DATA, workerClearImagesList)
}

export default function* imageSaga(): Generator {
    yield all([
        watchGetImages(),
        watchAddImage(),
        watchDeleteImage(),
        watchClearImagesList(),
    ])
}
