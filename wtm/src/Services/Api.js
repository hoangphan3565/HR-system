import axios from 'axios';
const url = {
    baseURL: "http://localhost:8080/api",
    positions: "/positions",
    employees:"/employees",
    department:"/departments"
};
const instance = axios.create({
    baseURL: url.baseURL,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
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