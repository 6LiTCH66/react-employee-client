import axios from "axios";

const URL = 'https://employee-webserver.herokuapp.com/api/employee/'

function addEmployee(employeeJson){
    return axios.post(URL, employeeJson, {withCredentials: true})

}
function getEmployee(){
    return axios.get("https://employee-webserver.herokuapp.com/api/employee/",
        {withCredentials: true})
}
function updateEmployees(id, updatedEmployee){
    return axios.put("https://employee-webserver.herokuapp.com/api/employee/" + id, updatedEmployee, {withCredentials: true})
}
function deleteEmployees(id){
    return axios.delete("https://employee-webserver.herokuapp.com/api/employee/" + id, {withCredentials: true})
}

export {addEmployee, getEmployee, updateEmployees, deleteEmployees}