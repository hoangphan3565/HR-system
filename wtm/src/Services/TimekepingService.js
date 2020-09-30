import Api from './Api';
import { createElement } from 'react';
const list=(a)=>Api.get(`${Api.url.timekeeping}/date/${a}`)
const clear=(a,b)=>Api.delete(`${Api.url.timekeeping}/${a}/uid/${b}`)
const updatee=(a,b,c)=>Api.put(`${Api.url.timekeeping}/${a}/updatetime/${b}/uid/${c}`)
const sync=(a)=>Api.post(`${Api.url.timekeeping}/syncdatas/${a}`)
const findByDept=(a,b)=>Api.get(`${Api.url.timekeeping}/date/${a}/dept/${b}`)
const findById=(a)=>Api.get(`${Api.url.timekeeping}/${a}`);
const create=(a,b)=>Api.post(`${Api.url.timekeeping}/create/empcode/${a}`,b);
export default{
    list:list,
    clear:clear,
    update:updatee,
    sync:sync,
    findByDept:findByDept,
    findById:findById,
    create:create
}