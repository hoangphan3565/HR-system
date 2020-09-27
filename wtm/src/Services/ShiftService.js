import Api from "./Api";
const list = () => Api.get(Api.url.shift);

const get = (id) => Api.get(`${Api.url.shift}/${id}`);

const update = (id, a) => Api.put(`${Api.url.shift}/${id}`, a);

const add = (a) => Api.post(Api.url.shift, a);
const del = (id) => Api.delete(`${Api.url.shift}/${id}`);
export default {
  list: list,
  update: update,
  add: add,
  del: del,
  get: get,
};
