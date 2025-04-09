import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUserId = localStorage.getItem("userId");
        if (storedUserId) setUser(storedUserId);
    }, []);

    const login = (userData) => {
        setUser(userData);
        
        localStorage.setItem("userId", userData.userId);
        localStorage.setItem("token", userData.token);
       
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("userId");
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
