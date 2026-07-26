import axios from "axios";

const api = axios.create({
  baseURL: process.env.BACKEND_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   },
// );

// api.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       // Handle unauthorized error (e.g., redirect to login page)
//       console.error("Unauthorized access - redirecting to login.");
//       // You can implement a redirect to the login page here
//     }
//     return Promise.reject(error);
//   },
// );

export default api;
