import React from 'react'
import { useSelector } from 'react-redux'
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { AppRouter } from './AppRouter'
import { Auth } from '../components/Auth'
import { RootState } from '../redux/rootReducer'
import { PATH_ROUTES } from '../constants/routePaths'

const PaintRouterComponent = (): JSX.Element => {
    const user = useSelector((state: RootState) => state.user.user.uid)

    return (
        <Router>
            <Switch>
                <Route exact path={PATH_ROUTES.MAIN}>
                    <Redirect to={user ? PATH_ROUTES.APP : PATH_ROUTES.AUTH} />
                </Route>
                <Route
                    path={PATH_ROUTES.APP}
                    render={() =>
                        user ? (
                            <AppRouter />
                        ) : (
                            <Redirect to={PATH_ROUTES.AUTH} />
                        )
                    }
                />
                <Route
                    path={PATH_ROUTES.AUTH}
                    render={() =>
                        user ? <Redirect to={PATH_ROUTES.APP} /> : <Auth />
                    }
                />
            </Switch>
        </Router>
    )
}

export const PaintRouter = React.memo(PaintRouterComponent)
