import { Button, Menu } from 'antd'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Route, useRouteMatch } from 'react-router'
import { Link } from 'react-router-dom'
import { Feed } from '../components/Feed/FeedComponent'
import { Paint } from '../components/Paint'
import { logOut } from '../redux/userReducer/actions'
import { clearImagesList } from '../redux/imagesReducer/actions'

const AppRouterComponent = (): JSX.Element => {
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
            <Route exact path={path} component={Feed} />
            <Route path={`${path}/paint`} component={Paint} />
        </>
    )
}

export const AppRouter = React.memo(AppRouterComponent)
