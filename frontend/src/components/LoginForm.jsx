import { useState } from "react";
import { login } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import loginImage from "../assets/login-image.png"; 
import { Link } from "react-router-dom";
// Add an image



const LoginForm = () => {
    
    const [formData, setFormData] = useState({ username: "", email: "", password: "" });
    const [error, setError] = useState(null);
    const { login: loginUser } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = await login(formData);
            loginUser(userData);
            
            
            navigate("/home");
        } catch (err) {
            setError(err.response?.data?.error || "Login failed");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen w-full bg-gradient-to-br from-blue-600 to-black-600">
            <div className="flex w-full max-w-4xl bg-white shadow-xl rounded-lg overflow-hidden">
                <div className="w-1/2 hidden md:block">
                    <img src={loginImage} alt="Login" className="w-full h-full object-cover" />
                </div>
                <motion.form 
                    initial={{ opacity: 0, x: 50 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    transition={{ duration: 0.5 }}
                    onSubmit={handleSubmit} 
                    className="w-full md:w-1/2 p-8"
                >
                    <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brown-500 to-blue-500 text-center mb-6">
                        Welcome Back!
                    </h2>
                    {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                    <div className="mb-4">
                        <input 
                            type="text" 
                            name="username" 
                            placeholder="Username" 
                            onChange={handleChange} 
                            className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500" 
                        />
                    </div>
                    <div className="mb-4">
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="Email" 
                            onChange={handleChange} 
                            className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500" 
                        />
                    </div>
                    <div className="mb-6">
                        <input 
                            type="password" 
                            name="password" 
                            placeholder="Password" 
                            onChange={handleChange} 
                            className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500" 
                        />
                    </div>
                    <motion.button 
                        whileHover={{ scale: 1.05 }} 
                        whileTap={{ scale: 0.95 }} 
                        type="submit" 
                        className="w-full bg-green-500 text-white p-3 rounded-lg shadow-md hover:bg-blue-600 transition"
                        
                    >
                        Login
                    </motion.button>
                    <p className="text-center mt-4">Don't have an account? <Link to="/signup" className="text-blue-500 hover:underline">Sign up</Link></p>
                </motion.form>
            </div>
        </div>
    );
};

export default LoginForm;