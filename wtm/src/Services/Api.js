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
};
const loginInfoStr=Cookies.get("loginInfo");
const instance = axios.create({
    baseURL: url.baseURL,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization":loginInfoStr
        
    }
})
instance.interceptors.request.use((request)=>{
    
    if(loginInfoStr){
        console.log(loginInfoStr);
        request.headers.Authorization=`Bearer ${loginInfoStr}`
    }
})

instance.interceptors.response.use((response)=>{
    return response;
})

export default {
    url: url,
    axios: instance,
    get: instance.get,
    post: instance.post,
    put: instance.put,
    delete: instance.delete
};