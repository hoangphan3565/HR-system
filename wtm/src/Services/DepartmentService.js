import Api from './Api';
const list=()=>Api.get(Api.url.department);
const add=()=>Api.post(Api.url.department);
export default{
    list:list,
    add:add
}