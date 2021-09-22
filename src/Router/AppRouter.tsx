import React from 'react'
import { Route, useRouteMatch } from 'react-router'
import { Feed } from '../components/Feed/FeedComponent'
import { Paint } from '../components/Paint'
import { HeaderMenu } from '../components/Menu'

const AppRouterComponent = (): JSX.Element => {
    const { path } = useRouteMatch()

    return (
        <>
            <HeaderMenu />
            <Route exact path={path} component={Feed} />
            <Route path={`${path}/paint`} component={Paint} />
        </>
    )
}

export const AppRouter = React.memo(AppRouterComponent)
