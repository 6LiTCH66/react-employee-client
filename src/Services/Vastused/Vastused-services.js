import axios from "axios";
export default function updateVastused(body, id){
    axios.put(`https://employee-webserver.herokuapp.com/scraping/vastused/${id}`, body)
        .then(response => {})
}