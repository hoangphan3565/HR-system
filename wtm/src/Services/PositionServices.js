import Api from './Api';
const list = () => Api.get(Api.url.positions)

//const get = (id) => Api.get(`$(Api.url.majors)/${id}`)

const update =(id,a)=>Api.put(`${Api.url.positions}/${id}`,a);

const add=(a)=>Api.post(Api.url.positions,a);

export default{
    list:list,
    update:update,
    add:add
};