import React from 'react'

function Sidebar() {
    return (
        <aside className="w-64 bg-gray-800 text-white h-screen p-5">
          <h2 className="text-xl font-bold mb-5">Food Tracker</h2>
          <nav>
            <ul className="space-y-3">
              <li className="hover:text-yellow-400 cursor-pointer">🏠 Home</li>
              <li className="hover:text-yellow-400 cursor-pointer">⭐ Favorites</li>
              <li className="hover:text-yellow-400 cursor-pointer">📦 Orders</li>
              <li className="hover:text-yellow-400 cursor-pointer">⚙️ Settings</li>
            </ul>
          </nav>
        </aside>
      );
    };

export default Sidebar
