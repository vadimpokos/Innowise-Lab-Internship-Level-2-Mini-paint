import React from 'react'
import 'antd/dist/antd.css'
import { PaintRouter } from './router/PaintRouter'
import { useDeviceType } from './hooks/useDeviceType'
import { useEffect } from 'react'
import { WithHOC } from './components/Hoc'

interface IApp {
    isUsingHOC?: boolean
}

function AppComponent({ isUsingHOC }: IApp): JSX.Element {
    const device = useDeviceType()
    useEffect(() => console.log(device, isUsingHOC))

    return (
        <>
            <PaintRouter />
        </>
    )
}

export const App = WithHOC(AppComponent)
