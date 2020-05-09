import Axios from "axios";

export default function AxiosConfig () {
    Axios.defaults.baseURL= process.env.BACKEND_URL || `http://localhost:3001/`;
    Axios.defaults.headers.common['Accept'] = 'application/json';
    Axios.defaults.headers.common['Content-Type'] = 'application/json';
};