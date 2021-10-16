import { all } from '@redux-saga/core/effects'
import imageSaga from './imageSaga'
import userSaga from './userSaga'

export default function* rootSaga(): Generator {
    yield all([userSaga(), imageSaga()])
}
