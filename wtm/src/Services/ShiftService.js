import Api from './Api';
const get = () => Api.get(Api.url.shift);
export default {
    get: get
}