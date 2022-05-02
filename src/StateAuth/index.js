import { createGlobalState } from "react-hooks-global-state";

const { setGlobalState, useGlobalState} = createGlobalState({
    isAuth: localStorage.getItem("currentUser") ? true: false,
    refreshEmployee: false,
    refreshVastused: false,
    refreshInfoLex: false,
    showSnackBar: false,
})
export {useGlobalState, setGlobalState};