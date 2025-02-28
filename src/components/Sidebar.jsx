import React, { useState } from "react";
import { Home, Star, ClipboardList, Settings, Sun, Moon } from "lucide-react";

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
      className={`w-64 h-screen p-5 transition-all ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <h2 className="text-2xl font-bold mb-6">🍔 FoodTracker</h2>

      <ul className="space-y-3">
        {menuItems.map((item) => (
          <li
            key={item.name}
            className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all ${
              active === item.name
                ? darkMode
                  ? "bg-gray-700"
                  : "bg-gray-300"
                : darkMode
                ? "hover:bg-gray-700"
                : "hover:bg-gray-200"
            }`}
            onClick={() => setActive(item.name)}
          >
            {item.icon}
            <span>{item.name}</span>
          </li>
        ))}
      </ul>

      {/* Dark Mode Toggle Button */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="mt-6 flex items-center space-x-2 px-4 py-2 rounded-lg w-full bg-blue-500 text-white dark:bg-yellow-500 transition-all"
      >
        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
      </button>
    </div>
  );
}

export default Sidebar;
