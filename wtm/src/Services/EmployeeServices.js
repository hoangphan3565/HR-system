import Api from './Api';
const list=(a)=>Api.get(`${Api.url.employees}/${a}`);
const clear=(a)=>Api.delete(`${Api.url.employees}/${a}`);
const add=(deptid,posid,a)=>Api.post(`${Api.url.employees}/create/dept/${deptid}/pos/${posid}`,a)
export default{
    list:list,
    clear:clear,
    add:add
}