import axios from 'axios';

const BASE_URL = "http://localhost:5000/";
const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken;
export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers:{token:`Bearer ${TOKEN}`},
});

export const publicRequest = axios.create({
    baseURL: BASE_URL,
});


publicRequest.interceptors.response.use(
    response => {
        console.log('Response:', response);
        return response;
    },
    error => {
        console.error('Error Response:', error);
        return Promise.reject(error);
    }
);

