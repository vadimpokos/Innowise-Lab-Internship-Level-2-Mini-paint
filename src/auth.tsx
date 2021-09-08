import { Button } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'
import { googleSignIn } from './redux/userReducer/actions'

export const Auth = (): JSX.Element => {
    const dispatch = useDispatch()

    const handleAuthButton = (): void => {
        dispatch(googleSignIn())
    }

    return (
        <div className="auth-wrapper">
            <div className="auth-container">
                <h1>Sign In with Google</h1>
                <Button onClick={handleAuthButton}>Auth</Button>
            </div>
        </div>
    )
}
