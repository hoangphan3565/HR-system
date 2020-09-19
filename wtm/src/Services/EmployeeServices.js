import Api from './Api';
const list=(a)=>Api.get(`${Api.url.employees}/${a}`);
export default{
    list:list
}