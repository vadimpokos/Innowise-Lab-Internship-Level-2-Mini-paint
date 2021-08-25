import React from 'react'
import './App.css'
import 'antd/dist/antd.css'
import { Main } from './Main'
import { useSelector } from 'react-redux'
import { RootState } from './redux/rootReducer'
import { Auth } from './auth'
import { useEffect } from 'react'

function App(): JSX.Element {
    const user = useSelector((state: RootState) => state.user.user.uid)

    useEffect(() => console.log(user))

    return user ? <Main /> : <Auth />
}

export default App
