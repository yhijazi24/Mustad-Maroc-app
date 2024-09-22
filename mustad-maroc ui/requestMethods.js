import axios from 'axios';

const BASE_URL = "http://localhost:5000/";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2Y2YzNGViYTJlNjQ4Mzc5OGNiYmUxZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcyNjA3Njk3OCwiZXhwIjoxNzI2MzM2MTc4fQ.oDcRhwFEWZLOgRyLuwiZB431fW2hEOu52PICymRFD6I";

export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    header:{token:`Bearer ${TOKEN}`},
});

