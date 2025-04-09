import { useState } from "react";
import { signup } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import signupImage from "../assets/signup-image.jpg";


const SignupForm = () => {
    const [formData, setFormData] = useState({ username: "", email: "", password: "" });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signup(formData);
            navigate("/login"); // Redirect to login page after signup
        } catch (err) {
            setError(err.response?.data?.error || "Signup failed");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen w-full bg-gradient-to-br from-blue-600 to-black-600">
            <div className="flex w-full max-w-4xl bg-white shadow-xl rounded-lg overflow-hidden">
                <div className="w-1/2 hidden md:block">
                    <img src={signupImage} alt="Signup" className="w-full h-full object-cover" />
                </div>
                <motion.div 
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full md:w-1/2 p-8"
                >
                    <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 text-center mb-6">
                        Create an Account
                    </h2>
                    {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                    <motion.form 
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        onSubmit={handleSubmit} 
                        className="space-y-4"
                    >
                        <div className="flex items-center border border-gray-300 rounded p-3 bg-white bg-opacity-70">
                            <FaUser className="text-gray-400 mr-3" />
                            <input 
                                type="text" 
                                name="username" 
                                placeholder="Username" 
                                onChange={handleChange} 
                                className="w-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all bg-transparent"
                            />
                        </div>
                        <div className="flex items-center border border-gray-300 rounded p-3 bg-white bg-opacity-70">
                            <FaEnvelope className="text-gray-400 mr-3" />
                            <input 
                                type="email" 
                                name="email" 
                                placeholder="Email" 
                                onChange={handleChange} 
                                className="w-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all bg-transparent"
                            />
                        </div>
                        <div className="flex items-center border border-gray-300 rounded p-3 bg-white bg-opacity-70">
                            <FaLock className="text-gray-400 mr-3" />
                            <input 
                                type="password" 
                                name="password" 
                                placeholder="Password" 
                                onChange={handleChange} 
                                className="w-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all bg-transparent"
                            />
                        </div>
                        <motion.button 
                            whileHover={{ scale: 1.05 }} 
                            whileTap={{ scale: 0.95 }} 
                            type="submit" 
                            className="w-full bg-purple-500 text-white p-3 rounded-lg shadow-md hover:bg-purple-600 transition"
                        >
                            Sign Up
                        </motion.button>
                    </motion.form>
                    <p className="text-center mt-4">Already have an account? <Link to="/login" className="text-purple-500 hover:underline">Log in</Link></p>
                </motion.div>
            </div>
        </div>
    );
};

export default SignupForm;
