import Api from './Api'
import axios from 'axios'
const login = () => axios.get(Api.url.login);
export default {
    login: login
}