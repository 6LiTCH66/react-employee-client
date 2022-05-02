import axios from "axios";

function updatedInfoLex(body, id){
    axios.put(`https://employee-webserver.herokuapp.com/info/infolex/${id}`, body)
        .then(res => {})
}

function getInfoLex(){
    return axios.get("https://employee-webserver.herokuapp.com/info/infolex")
}

export {getInfoLex, updatedInfoLex}