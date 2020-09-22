import Api from './Api';
const list=(a)=>Api.get(`${Api.url.employees}/${a}`);
const clear=(a,b)=>Api.delete(`${Api.url.employees}/${a}/uid/${b}`);
const add=(deptid,posid,a)=>Api.post(`${Api.url.employees}/create/dept/${deptid}/pos/${posid}`,a)
const update=(empid,deptid,posid,a)=>Api.put(`${Api.url.employees}/update/${empid}/dept/${deptid}/pos/${posid}`,a)
const findByFname=(a)=>Api.get(`${Api.url.employees}/find/fname/${a}`)
const findByCode=(a)=>Api.get(`${Api.url.employees}/find/code/${a}`)
const findByPos=(a)=>Api.get(`${Api.url.employees}/pos/${a}`)
const findByDept=(a)=>Api.get(`${Api.url.employees}/dept/${a}`)
const findByDeptAndPos=(a,b)=>Api.get(`${Api.url.employees}/find/dept/${a}/pos/${b}`)
const findByCodeAndPos=(a,b)=>Api.get(`${Api.url.employees}/find/code/${a}/pos/${b}`)
const findByCodeAndDept=(a,b)=>Api.get(`${Api.url.employees}/find/code/${a}/dept/${b}`)
const findByCodeAndDeptAndPos=(a,b,c)=>Api.get(`${Api.url.employees}/find/code/${a}/dept/${b}/pos/${c}`)
export default{
    list:list,
    clear:clear,
    add:add,
    update:update,
    findByFname:findByFname,
    findByCode:findByCode,
    findByPos:findByPos,
    findByDept:findByDept,
    findByDeptAndPos:findByDeptAndPos,
    findByCodeAndDept:findByCodeAndDept,
    findByCodeAndPos:findByCodeAndPos,
    findByCodeAndDeptAndPos:findByCodeAndDeptAndPos
}