import React, { useState } from 'react'
import { ShoppingCart, Truck } from "lucide-react";

function RewardsActions({ darkMode }) {
    const [rewardPoints, setRewardPoints] = useState(1250);

    return (
        <div className={`shadow-md rounded-lg p-5 mb-5 transition-all ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
        }`}
        >
          {/* Reward Points */}
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">My reward points</p>
              <h2 className="text-2xl font-bold">{rewardPoints} pts</h2>
            </div>
            <div className="flex space-x-3">
              <button className={`px-6 py-2 rounded-full flex items-center justify-center transition-all ${
                darkMode ? "bg-indigo-600 hover:bg-indigo-700" : "bg-indigo-100 text-indigo-600 hover:bg-indigo-200"
              }`}>
                <span>Order</span>
              </button>
              <button className={`px-6 py-2 rounded-full flex items-center justify-center transition-all ${
                darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"
              }`}>
                <span>Track</span>
              </button>
            </div>
          </div>
        </div>
      );
};

export default RewardsActions;