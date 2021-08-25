import { Button } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'
import { googleSignIn } from './redux/actions'

export const Auth = (): JSX.Element => {
    const dispatch = useDispatch()

    return (
        <>
            <h1>Sign In with Google</h1>
            <Button onClick={() => dispatch(googleSignIn())}>Auth</Button>
        </>
    )
}
