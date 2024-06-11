// axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://api.wheretheiss.at/v1/',
});

export default axiosInstance;