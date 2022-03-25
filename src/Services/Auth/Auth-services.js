import axios from "axios";


function LoginAuth(email, password, navigate){
    axios.post("https://employee-webserver.herokuapp.com/auth/signin",
        {email, password}, {withCredentials: true})
        .then(response => {
            console.log(response)
            navigate("/")
        })

}

function RegistrationAuth(email, password, navigate){
    axios.post("https://employee-webserver.herokuapp.com/auth/signup",
        {email, password}, {withCredentials: true})
        .then(response => {
            console.log(response)
            navigate("/login")
    })

}

export {LoginAuth, RegistrationAuth}