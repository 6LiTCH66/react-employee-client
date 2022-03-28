import axios from "axios";

function updateVastused(body, id){
    axios.put(`https://employee-webserver.herokuapp.com/scraping/vastused/${id}`, body)
        .then(response => {})
}

function getVastused(){
    return axios.get("https://employee-webserver.herokuapp.com/scraping/vastused/")
}
export {updateVastused, getVastused}