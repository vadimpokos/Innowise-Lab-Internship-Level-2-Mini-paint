import { Button } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'
import { googleSignIn } from '../../reduxToolkit/actions/userActions'
import * as S from './styles'

export const AuthComponent = (): JSX.Element => {
    const dispatch = useDispatch()

    const handleAuthButton = (): void => {
        dispatch(googleSignIn())
    }

    return (
        <S.Wrapper>
            <S.Container>
                <h1>Sign In with Google</h1>
                <Button onClick={handleAuthButton}>Auth</Button>
            </S.Container>
        </S.Wrapper>
    )
}

export const Auth = React.memo(AuthComponent)
