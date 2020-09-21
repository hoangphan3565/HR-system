import Api from './Api';
const list=(a)=>Api.get(`${Api.url.employees}/${a}`);
const clear=(a)=>Api.delete(`${Api.url.employees}/${a}`);
const add=(deptid,posid,a)=>Api.post(`${Api.url.employees}/create/dept/${deptid}/pos/${posid}`,a)
const update=(empid,deptid,posid,a)=>Api.put(`${Api.url.employees}/update/${empid}/dept/${deptid}/pos/${posid}`,a)
export default{
    list:list,
    clear:clear,
    add:add,
    update:update
}