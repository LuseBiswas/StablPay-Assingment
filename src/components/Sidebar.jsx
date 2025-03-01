import React, { useState, useEffect, useRef } from "react";
import { Home, Star, ClipboardList, Settings, LogOut, Sun, Moon, Menu, X } from "lucide-react";

function Sidebar({ darkMode, setDarkMode }) {
  const [active, setActive] = useState("Home");
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const sidebarRef = useRef(null);

  const menuItems = [
    { name: "Home", icon: <Home size={20} /> },
    { name: "Favorites", icon: <Star size={20} /> },
    { name: "Orders", icon: <ClipboardList size={20} /> },
    { name: "Settings", icon: <Settings size={20} /> },
  ];

  // Update isMobile state on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Add effect to handle clicks outside sidebar
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        isOpen && 
        sidebarRef.current && 
        !sidebarRef.current.contains(event.target) &&
        isMobile
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, isMobile]);

  return (
    <>
      {/* Mobile Header Bar */}
      <div className={`fixed top-0 left-0 w-full z-40 md:hidden flex items-center justify-between p-4 ${darkMode ? "bg-gray-900 text-white" : "bg-white shadow-sm"}`}>
        <button
          className="flex items-center justify-center focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <div className="relative w-6 h-5">
            <span className={`absolute h-0.5 w-full rounded transition-all duration-300 ${darkMode ? "bg-white" : "bg-gray-800"} ${isOpen ? "rotate-45 top-2" : "top-0"}`}></span>
            <span className={`absolute h-0.5 w-full rounded transition-all duration-300 ${darkMode ? "bg-white" : "bg-gray-800"} top-2 ${isOpen ? "opacity-0" : "opacity-100"}`}></span>
            <span className={`absolute h-0.5 w-full rounded transition-all duration-300 ${darkMode ? "bg-white" : "bg-gray-800"} ${isOpen ? "-rotate-45 top-2" : "top-4"}`}></span>
          </div>
        </button>
        
        <h2 className="text-xl font-bold text-indigo-600">StaplEat</h2>
        
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="flex items-center justify-center p-2 rounded-full"
          aria-label="Toggle dark mode"
        >
          {darkMode ? <Sun size={20} className="text-yellow-500" /> : <Moon size={20} className="text-indigo-600" />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed md:static w-64 h-full flex flex-col justify-between transition-all duration-300 ease-in-out z-50 
        ${darkMode ? "bg-gray-900 text-white" : "bg-white"} 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
        ${isMobile ? "top-0 pt-16 shadow-lg" : "top-0"}
        `}
      >
        <div className="p-5">
          <h2 className="text-2xl font-bold mb-6 text-indigo-600 hidden md:block">StaplEat</h2>

          <ul className="space-y-3">
            {menuItems.map((item) => (
              <li
                key={item.name}
                className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all 
                ${active === item.name ? (darkMode ? "bg-gray-800 text-indigo-400" : "bg-indigo-100 text-indigo-600") : ""} 
                ${darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"}`}
                onClick={() => {
                  setActive(item.name);
                  if (isMobile) setIsOpen(false);
                }}
              >
                {item.icon}
                <span>{item.name}</span>
              </li>
            ))}
          </ul>

          {/* Theme Toggle Button for Desktop view only */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`mt-6 hidden md:flex items-center space-x-2 px-4 py-2 rounded-lg w-full transition-all 
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

      {/* Overlay funtions for mobile experience */}
      {isOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div className="h-16 md:hidden" />
    </>
  );
}

export default Sidebar;