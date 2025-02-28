// Sidebar.jsx
import React, { useState } from "react";
import { Home, Star, ClipboardList, Settings, LogOut, Sun, Moon } from "lucide-react";

function Sidebar({ darkMode, setDarkMode }) {
  const [active, setActive] = useState("Home");

  const menuItems = [
    { name: "Home", icon: <Home size={20} /> },
    { name: "Favorites", icon: <Star size={20} /> },
    { name: "Orders", icon: <ClipboardList size={20} /> },
    { name: "Settings", icon: <Settings size={20} /> },
  ];

  return (
    <div
      className={`w-64 min-h-screen flex flex-col justify-between transition-all ${
        darkMode ? "bg-gray-900 text-white" : "bg-white"
      }`}
    >
      <div className="p-5">
        <h2 className="text-2xl font-bold mb-6 text-indigo-600">StaplEat</h2>

        <ul className="space-y-3">
          {menuItems.map((item) => (
            <li
              key={item.name}
              className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all ${
                active === item.name
                  ? darkMode 
                    ? "bg-gray-800 text-indigo-400" 
                    : "bg-indigo-100 text-indigo-600"
                  : darkMode
                    ? "hover:bg-gray-800"
                    : "hover:bg-gray-100"
              }`}
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
          className={`mt-6 flex items-center space-x-2 px-4 py-2 rounded-lg w-full transition-all ${
            darkMode 
              ? "bg-yellow-500 text-gray-900" 
              : "bg-indigo-600 text-white"
          }`}
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
  );
}

export default Sidebar;