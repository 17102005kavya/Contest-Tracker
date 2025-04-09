import { useTheme } from "../context/ThemeContext";
import { Sun, Moon } from "lucide-react"; // Icons for light/dark mode

const ThemeSwitcher = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition"
        >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </button>
    );
};

export default ThemeSwitcher;
