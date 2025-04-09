import { useAuth } from "../context/AuthContext"; // Adjust path based on your project structure

const Header = () => {
    const { user } = useAuth(); // Get user data from authentication context

    return (
        <header className="bg-white shadow-md py-4 px-6">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
                {/* Logo / Title */}
                <h1 className="text-2xl font-bold text-blue-600">🚀 Contest Tracker</h1>

                {/* Navigation */}
                <nav>
                    <ul className="flex space-x-6 text-gray-700">
                        <li><a href="/home" className="hover:text-blue-500">Home</a></li>
                        <li><a href="/contests" className="hover:text-blue-500">Contests</a></li>
                        <li><a href="/about" className="hover:text-blue-500">About</a></li>
                        {user && ( // Show "Bookmarked Contests" only if the user is logged in
                            <li><a href="/bookmarks" className="hover:text-blue-500">Bookmarked Contests</a></li>
                        )}
                    </ul>
                </nav>

                {/* CTA Button */}
                {user ? (
                    <a href="/profile" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                        Profile
                    </a>
                ) : (
                    <a href="/login" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                        Login
                    </a>
                )}
            </div>
        </header>
    );
};

export default Header;
