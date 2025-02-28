import React, { useState, useEffect, useRef } from "react";
import { Home, Star, ClipboardList, Settings, LogOut, Sun, Moon, Menu, X } from "lucide-react";

function Sidebar({ darkMode, setDarkMode }) {
  const [active, setActive] = useState("Home");
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);

  const menuItems = [
    { name: "Home", icon: <Home size={20} /> },
    { name: "Favorites", icon: <Star size={20} /> },
    { name: "Orders", icon: <ClipboardList size={20} /> },
    { name: "Settings", icon: <Settings size={20} /> },
  ];

  // Add effect to handle clicks outside sidebar
  useEffect(() => {
    function handleClickOutside(event) {
      // Only close if sidebar is open and on mobile view (md:hidden is active)
      if (
        isOpen && 
        sidebarRef.current && 
        !sidebarRef.current.contains(event.target) &&
        window.innerWidth < 768 // md breakpoint
      ) {
        setIsOpen(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div>
      {/* Hamburger Menu Button for Mobile */}
      <button
        className="md:hidden p-3 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed md:static w-64 min-h-screen flex flex-col justify-between transition-all z-50 
        ${darkMode ? "bg-gray-900 text-white" : "bg-white"} 
        ${isOpen ? "left-0" : "-left-64"} md:left-0 top-0 md:flex`}
      >
        <div className="p-5">
          <h2 className="text-2xl font-bold mb-6 text-indigo-600">StaplEat</h2>

          <ul className="space-y-3">
            {menuItems.map((item) => (
              <li
                key={item.name}
                className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all 
                ${active === item.name ? (darkMode ? "bg-gray-800 text-indigo-400" : "bg-indigo-100 text-indigo-600") : ""} 
                ${darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"}`}
                onClick={() => setActive(item.name)}
              >
                {item.icon}
                <span>{item.name}</span>
              </li>
            ))}
          </ul>

          {/* Theme Toggle Button */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`mt-6 flex items-center space-x-2 px-4 py-2 rounded-lg w-full transition-all 
            ${darkMode ? "bg-yellow-500 text-gray-900" : "bg-indigo-600 text-white"}`}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
          </button>
        </div>

        {/* Log Out Button at Bottom */}
        <div className="p-5 mt-auto">
          <div 
            className="flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <LogOut size={20} />
            <span>Log Out</span>
          </div>
        </div>
      </div>

      {/* Optional: Add overlay for better mobile experience */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}

export default Sidebar;