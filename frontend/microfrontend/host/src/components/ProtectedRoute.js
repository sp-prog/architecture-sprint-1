import React from 'react';
import {Route, Redirect} from "react-router-dom";
import {BrowserRouter} from "react-router-dom";
import {useHistory} from "react-router-dom";
import Main from "./Main";

const ProtectedRoute = ({ ...props}) => {
    const history = useHistory();


    return (

        <BrowserRouter history={history}>
                <Route exact>
                    {
                        () => props.loggedIn ? <Main {...props} /> : <Redirect to="./signin"/>
                    }
                </Route>
        </BrowserRouter>
    )
}

export default ProtectedRoute;