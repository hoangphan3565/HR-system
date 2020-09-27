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
const instance = axios.create({
    baseURL: url.baseURL,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        
    }
})
const loginInfoStr=Cookies.get("loginInfo");
console.log(loginInfoStr);
/*
instance.interceptors.request.use((request)=>{
    
    if(loginInfoStr){
        const loginInfo=JSON.parse(loginInfoStr);
        request.headers.Authorization=`Bearer ${loginInfo.accessToken}`
    }
})
/*
instance.interceptors.response.use((response)=>{
    return response;
},(error)=>{
    if(error.response.status===401){
        window.location.href="/login";
    }
})
*/
export default {
    url: url,
    axios: instance,
    get: instance.get,
    post: instance.post,
    put: instance.put,
    delete: instance.delete
};