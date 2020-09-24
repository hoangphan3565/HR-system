import Api from './Api';
const login=(c)=>(Api.post(Api.url.login,c));
export default{
    login:login
}