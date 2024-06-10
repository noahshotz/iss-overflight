// axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://api.open-notify.org/',
});

export default axiosInstance;