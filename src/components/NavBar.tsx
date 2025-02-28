
import { Link, useLocation } from "react-router-dom";
import { Clock, Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from "../context/ThemeContext";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

const NavBar = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === "dark";

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Clock className="h-8 w-8 text-primary-blue dark:text-primary-foreground" />
              <span className="ml-2 text-xl font-bold text-primary-blue dark:text-primary-foreground">
                MeetSmart
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={toggleTheme}
                    className="hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {isDarkMode ? (
                      <Sun className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                    ) : (
                      <Moon className="h-5 w-5 text-gray-600" />
                    )}
                    <span className="sr-only">Toggle dark mode</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Toggle dark mode</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <div className="hidden sm:flex items-center space-x-4">
              <Link
                to="/dashboard"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === "/dashboard"
                    ? "bg-primary-blue/10 text-primary-blue dark:bg-primary/20 dark:text-primary-foreground"
                    : "text-gray-600 hover:text-primary-blue dark:text-gray-300 dark:hover:text-primary-foreground"
                }`}
              >
                Dashboard
              </Link>
              <Link
                to="/add-meeting"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === "/add-meeting"
                    ? "bg-primary-blue/10 text-primary-blue dark:bg-primary/20 dark:text-primary-foreground"
                    : "text-gray-600 hover:text-primary-blue dark:text-gray-300 dark:hover:text-primary-foreground"
                }`}
              >
                Add Meeting
              </Link>
              <Link
                to="/recommendations"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === "/recommendations"
                    ? "bg-primary-blue/10 text-primary-blue dark:bg-primary/20 dark:text-primary-foreground"
                    : "text-gray-600 hover:text-primary-blue dark:text-gray-300 dark:hover:text-primary-foreground"
                }`}
              >
                Recommendations
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
