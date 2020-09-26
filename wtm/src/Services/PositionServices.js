import Api from "./Api";
const list = () => Api.get(Api.url.positions);

const get = (id) => Api.get(`${Api.url.positions}/${id}`);

const update = (id, a) => Api.put(`${Api.url.positions}/${id}`, a);

const add = (a) => Api.post(Api.url.positions, a);
const del = (id) => Api.delete(`${Api.url.positions}/${id}`);
export default {
  list: list,
  update: update,
  add: add,
  del: del,
  get: get,
};
