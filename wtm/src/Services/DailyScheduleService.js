import Api from "./Api";
const list = () => Api.get(Api.url.dailyschedule);

const get = (id) => Api.get(`${Api.url.dailyschedule}/${id}`);

const update = (a,b,c) => Api.put(`${Api.url.dailyschedule}/${a}/uid/${b}`,c);

const add = (a) => Api.post(Api.url.dailyschedule, a);

const del = (a,b) => Api.delete(`${Api.url.dailyschedule}/${a}/uid/${b}`);
export default {
  list: list,
  update: update,
  add: add,
  del: del,
  get: get,
};
