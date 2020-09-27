import Api from "./Api";
const list = () => Api.get(Api.url.shift);

const get = (id) => Api.get(`${Api.url.shift}/${id}`);

const update = (a,b,c) => Api.put(`${Api.url.shift}/${a}/uid/${b}`,c);

const add = (a) => Api.post(Api.url.shift, a);

const del = (a,b) => Api.delete(`${Api.url.shift}/${a}/uid/${b}`);
export default {
  list: list,
  update: update,
  add: add,
  del: del,
  get: get,
};
