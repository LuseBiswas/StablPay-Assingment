import React, { useState } from 'react'
import { ShoppingCart, Truck, Star, Share2 } from "lucide-react";

function RewardsActions({ darkMode }) {
    const [rewardPoints, setRewardPoints] = useState(1200);

    return (
        <div className={`shadow-md rounded-lg p-5 mb-5 transition-all ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
        }`}
        >
          {/* Reward Points */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">🏆 Reward Points</h2>
            <span className="text-lg font-semibold text-green-500">{rewardPoints} Pts</span>
          </div>
    
          {/* Action Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button className={`flex items-center justify-center p-3 rounded-lg transition-all ${
              darkMode ? "bg-blue-500 hover:bg-blue-600 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}>
              <ShoppingCart size={18} className="mr-2" /> Order
            </button>
            <button className={`flex items-center justify-center p-3 rounded-lg transition-all ${
              darkMode ? "bg-purple-500 hover:bg-purple-600 text-white" : "bg-purple-600 hover:bg-purple-700 text-white"
            }`}>
              <Truck size={18} className="mr-2" /> Track
            </button>
            <button className={`flex items-center justify-center p-3 rounded-lg transition-all ${
              darkMode ? "bg-yellow-400 hover:bg-yellow-500 text-black" : "bg-yellow-500 hover:bg-yellow-600 text-white"
            }`}>
              <Star size={18} className="mr-2" /> Rate
            </button>
            <button className={`flex items-center justify-center p-3 rounded-lg transition-all ${
              darkMode ? "bg-gray-600 hover:bg-gray-700 text-white" : "bg-gray-700 hover:bg-gray-800 text-white"
            }`}>
              <Share2 size={18} className="mr-2" /> Share
            </button>
          </div>
        </div>
      );
};

export default RewardsActions;
