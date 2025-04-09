import axios from "axios";

const API_BASE = "http://localhost:5000/api/v1/auth"; // Replace with your backend URL


// ✅ Signup
export const signup = async (userData) => {
    const response = await axios.post(`${API_BASE}/signup`, userData);
    return response.data;
};

// ✅ Login
export const login = async (userData) => {
    const response = await axios.post(`${API_BASE}/login`, userData);
    return response.data;
};
