import axios from "axios";

function getUsers(){
    return axios.get("https://employee-webserver.herokuapp.com/api/user", {withCredentials: true})
}

export {getUsers}