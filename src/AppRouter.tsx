import { Button, Menu } from 'antd'

import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Route, useRouteMatch } from 'react-router'
import { Link } from 'react-router-dom'
import { Feed } from './Feed'
import { Main } from './Main'
import { clearImagesList, logOut } from './redux/actions'

export const AppRouter = (): JSX.Element => {
    const { path } = useRouteMatch()
    const dispatch = useDispatch()
    const [currentMenuItem, setCurrentMenuItem] = useState('feed')

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
                    <Button
                        id="logout-button"
                        onClick={() => {
                            dispatch(logOut())
                            dispatch(clearImagesList())
                        }}
                    >
                        Logout
                    </Button>
                </Menu.Item>
            </Menu>
            <Route exact path={path} component={Feed} />
            <Route path={`${path}/paint`} component={Main} />
        </>
    )
}
