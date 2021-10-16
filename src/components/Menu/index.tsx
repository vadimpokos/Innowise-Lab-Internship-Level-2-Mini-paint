import { Button, Menu } from 'antd'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useRouteMatch } from 'react-router-dom'
import { clearImagesList } from '../../reduxToolkit/actions/imageActions'
import { logOut } from '../../reduxToolkit/actions/userActions'

const HeaderMenuComponent = (): JSX.Element => {
    const { path } = useRouteMatch()
    const dispatch = useDispatch()
    const [currentMenuItem, setCurrentMenuItem] = useState('feed')

    const handleLogOut = (): void => {
        dispatch(logOut())
        dispatch(clearImagesList())
    }

    return (
        <>
            <Menu
                mode="horizontal"
                id="page-header"
                selectedKeys={[currentMenuItem]}
                onClick={(e) => setCurrentMenuItem(e.key)}
            >
                <Menu.Item key="paint">
                    <Link to={`${path}/paint`}>Paint</Link>
                </Menu.Item>
                <Menu.Item key="feed">
                    <Link to={path}>Feed</Link>
                </Menu.Item>
                <Menu.Item key="logout-button">
                    <Button id="logout-button" onClick={handleLogOut}>
                        Logout
                    </Button>
                </Menu.Item>
            </Menu>
        </>
    )
}

export const HeaderMenu = React.memo(HeaderMenuComponent)
