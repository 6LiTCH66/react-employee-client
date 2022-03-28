import * as React from 'react';
import {Navigate} from "react-router-dom";
import {useGlobalState} from "../StateAuth";

function AuthGuard({ children }){
    const [isAuthTest] = useGlobalState("isAuth")

    return isAuthTest ? children : <Navigate to="/login"/>

}
export default AuthGuard;