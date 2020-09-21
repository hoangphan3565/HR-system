import Api from './Api';
const list=()=>Api.get(Api.url.department);
export default{
    list:list
}