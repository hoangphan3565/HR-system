import Api from './Api';
const list=()=>Api.get(Api.url.department);
const add=(a)=>Api.post(Api.url.department,a);
const update=(a,b,c)=>Api.put(`${Api.url.department}/${a}/uid/${b}`,c)
const clear=(a,b)=>Api.delete(`${Api.url.department}/${a}/uid/${b}`)
export default{
    list:list,
    add:add,
    update:update,
    clear:clear
}