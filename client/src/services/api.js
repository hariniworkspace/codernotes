import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

/* ✅ Attach token to EVERY request automatically */
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

/* ✅ Catch 401 globally */
API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      console.error("Unauthorized — token missing/expired");
    }
    return Promise.reject(err);
  }
);

export default API;
