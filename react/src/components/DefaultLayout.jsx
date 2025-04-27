import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import Headbar from "./Headbar";

/**
 * Default layout component, handles rendering of main application layout
 * including headbar and main content area.
 *
 * Also handles redirecting if user is not authenticated.
 *
 * @returns {React.ReactElement} JSX element
 */
export default function DefaultLayout() {
  const { user, token, loadingUser } = useStateContext();
  const [darkMode, setDarkMode] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Handle loading state while checking auth
  if (loadingUser) {
    return <div className="flex justify-center items-center h-screen">
      Loading user data...
    </div>;
  }

  // Redirect if not authenticated
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Main layout render
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-200 transition-colors duration-300">
      <Headbar 
        toggleDarkMode={toggleDarkMode} 
        darkMode={darkMode}
        sidebarOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        user={user}
      />
      
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <div className="pt-20 px-4">
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}