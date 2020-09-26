import Api from './Api'
const get=()=>Api.get(Api.url.shiftdaily);
const add=(a,b,c,d)=>Api.post(`${Api.url.shiftdaily}/create/dls/${a}/shift/${b}/uid/${c}`,d);
const update=(a,b,c)=>Api.put(`${Api.url.shiftdaily}/${a}/uid/${b}`,c);
const dlte=(a,b)=>Api.delete(`${Api.url.shiftdaily}/${a}/uid/${b}`)
export default{
    get:get,
    add:add,
    update:update,
    dlte:dlte
}