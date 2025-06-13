import axios from 'axios';

const BASE_URL = "http://localhost:5000/";

let token = "";
try {
    const persistRoot = JSON.parse(localStorage.getItem("persist:root"));
    const user = persistRoot && JSON.parse(persistRoot.user);
    token = user && user.currentUser && user.currentUser.accessToken;
} catch (error) {
    console.error("Error accessing or parsing token from localStorage:", error);
}

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: { token: `Bearer ${token}` },
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
