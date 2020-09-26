import Api from "./Api";
const list = () => Api.get(Api.url.dailyschedule);

const get = (id) => Api.get(`${Api.url.dailyschedule}/${id}`);

const update = (id, a) => Api.put(`${Api.url.dailyschedule}/${id}`, a);

const add = (a) => Api.post(Api.url.dailyschedule, a);
const del = (id) => Api.delete(`${Api.url.dailyschedule}/${id}`);
export default {
  list: list,
  update: update,
  add: add,
  del: del,
  get: get,
};
