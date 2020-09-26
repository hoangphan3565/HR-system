import Api from './Api';
const get=(a)=>Api.get(`${Api.url.useractivity}/uid/${a}`);
const add=(a)=>Api.post(Api.url.useractivity,a);
const del=(a,b)=>Api.delete(`${Api.url.useractivity}/${a}/uid/${b}`);
export default{
    get:get,
    add:add,
    del:del
}