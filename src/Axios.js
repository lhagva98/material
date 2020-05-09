import Axios from "axios";


export default function AxiosConfig () {
    Axios.defaults.baseURL =  "https://epes-tergel-api.herokuapp.com/";
    Axios.defaults.headers.common['Accept'] = 'application/json';
    Axios.defaults.headers.common['Content-Type'] = 'application/json';
};