import Api from "./Api";
const list = () => Api.get(Api.url.employeeshift);

const get = (id) => Api.get(`${Api.url.employeeshift}/${id}`);

const update = (a, b, c, d) =>
  Api.put(`${Api.url.employeeshift}/${a}/uid/${b}/shift/${c}`, d);

const add = (a) => Api.post(Api.url.employeeshift, a);

const del = (a, b) => Api.delete(`${Api.url.employeeshift}/${a}/uid/${b}`);
const htr = (a) => Api.get(`${Api.url.employeeshift}/find/employee/${a}`);
const findDept = (a) => Api.get(`${Api.url.employeeshift}/find/dept/${a}`);
const findCode = (a) => Api.get(`${Api.url.employeeshift}/find/employee/${a}`);
export default {
  list: list,
  update: update,
  add: add,
  del: del,
  get: get,
  htr: htr,
  findDept: findDept,
  findCode: findCode,
};
