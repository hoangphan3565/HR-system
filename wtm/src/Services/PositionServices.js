import Api from "./Api";
const list = () => Api.get(Api.url.positions);

const get = (id) => Api.get(`${Api.url.positions}/${id}`);

const update = (id,a,b) => Api.put(`${Api.url.positions}/${id}/uid/${a}`,b);

const add = (a,b) => Api.post(`${Api.url.positions}/uid/${a}`,b);
const del = (a,b) => Api.delete(`${Api.url.positions}/${a}/uid/${b}`);
export default {
  list: list,
  update: update,
  add: add,
  del: del,
  get: get
};
