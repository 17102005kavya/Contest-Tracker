import axios from "axios";

const API_BASE = "http://localhost:5000/api/v1"; // Update with backend URL

// Create an axios instance
const api = axios.create({
    baseURL: API_BASE,
});

// Attach an interceptor to include the token in headers
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => Promise.reject(error));

// ✅ Add a bookmark
export const addBookmark = async (contest) => {
    const response = await api.post("/users/bookmarks", contest);
    return response.data;
};

// ✅ Get all bookmarks (userId should be passed as a query param or in headers)
export const getBookmarks = async (userId) => {
    const response = await api.get(`/users/bookmarks`, {
        params: { userId }  // Correct way to pass query params
    });
    return response.data;
};


// ✅ Remove a bookmark (Use DELETE with `data` option)
export const removeBookmark = async (userId, contestId) => {
    const response = await api.delete(`/users/bookmarks`, {
        data: { userId, contestId },
    });
    return response.data;
};

// ✅ Remove all bookmarks (Use DELETE with `data`)
export const removeAllBookmarks = async (userId) => {
    const response = await api.delete(`/users/bookmarks/all`, {
        data: { userId },
    });
    return response.data;
};
