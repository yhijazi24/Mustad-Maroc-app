import axios from 'axios';

const BASE_URL = "http://localhost:5000/";

const getAccessToken = () => {
  try {
    const persistRoot = JSON.parse(localStorage.getItem("persist:root"));
    const user = persistRoot && JSON.parse(persistRoot.user);
    return user?.currentUser?.accessToken;
  } catch (error) {
    console.error("Failed to extract token:", error);
    return null;
  }
};

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
});

// ✅ Dynamically inject token into headers before every request
userRequest.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.token = `Bearer ${token}`;
  }
  return config;
});
