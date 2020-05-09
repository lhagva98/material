import Axios from "axios";

const backendURL = process.env.BACKEND_URL || 'http://localhost:3001/';

export default function AxiosConfig () {
    Axios.defaults.baseURL =  backendURL;
    Axios.defaults.headers.common['Accept'] = 'application/json';
    Axios.defaults.headers.common['Content-Type'] = 'application/json';
};