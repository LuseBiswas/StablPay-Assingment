import React, { useState } from 'react'
import { Home, Star, ClipboardList, Settings } from "lucide-react";

function Sidebar() {
  const [active, setActive] = useState("Home");

  const menuItems = [
    { name: "Home", icon: <Home size={20} /> },
    { name: "Favorites", icon: <Star size={20} /> },
    { name: "Orders", icon: <ClipboardList size={20} /> },
    { name: "Settings", icon: <Settings size={20} /> },
  ];

  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-5">
      <h2 className="text-2xl font-bold mb-6">🍔 FoodTracker</h2>
      <ul className="space-y-3">
        {menuItems.map((item) => (
          <li
            key={item.name}
            className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all ${
              active === item.name ? "bg-gray-700" : "hover:bg-gray-600"
            }`}
            onClick={() => {
              setActive(item.name);
              onSelect(item.name);
            }}
          >
            {item.icon}
            <span>{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar
