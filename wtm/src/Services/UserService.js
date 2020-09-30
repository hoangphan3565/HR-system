import Api from './Api';
const login=(c)=>(Api.post(Api.url.login,c));
const get=(a)=>Api.get(`${Api.url.login}/${a}`)
export default{
    login:login,
    get:get
}