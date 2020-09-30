import axios from 'axios';
import Cookies from 'js-cookie';
const url = {
    baseURL: "http://localhost:8080/api",
    positions: "/positions",
    employees:"/employees",
    department:"/departments",
    timekeeping:"/timekeepings",
    login:"/login",
    holiday:"/holidays",
    shift:"/shifts",
    shiftdaily:"/shiftdailies",
    dailyschedule:"/dailyschedules",
    useractivity:"/useractivities",
    login:"/appusers",
    employeeshift:"/empshifts"
};
const instance = axios.create({
    baseURL: url.baseURL,
    headers: {
        'Access-Control-Allow-Origin': '*',
        "Content-Type": "application/json",
        "Accept": "application/json",
        
    }
})

export default {
    url: url,
    axios: instance,
    get: instance.get,
    post: instance.post,
    put: instance.put,
    delete: instance.delete
};