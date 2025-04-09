import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import Home from "./pages/HomePage";
import Login from "./pages/Login";
import Bookmarks from "./pages/Bookmarks";
import Signup from "./pages/Signup"
import About from "./pages/About"
import AllContests from "./pages/AllContests"
function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/" element={<Login />} />
                    <Route path="/signup" element={<Signup/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/contests" element={<AllContests/>}/>
                    {/* Protected Route: Only logged-in users can see bookmarks */}
                    <Route 
                        path="/bookmarks" 
                      element={<Bookmarks/>}
                    />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
