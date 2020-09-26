import Api from './Api';
const get=()=>Api.get(Api.url.dailyschedule);
export default{
    get:get
}