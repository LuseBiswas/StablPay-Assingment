import React, { useState } from 'react'
import { ShoppingCart, Truck, Star, Share2 } from "lucide-react";


function RewardsActions() {
    const [rewardPoints, setRewardPoints] = useState(1200);
    return (
        <div className="bg-white shadow-md rounded-lg p-5 mb-5">
          {/* Reward Points */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">🏆 Reward Points</h2>
            <span className="text-lg font-semibold text-green-600">{rewardPoints} Pts</span>
          </div>
    
          {/* Action Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button className="flex items-center justify-center bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition">
              <ShoppingCart size={18} className="mr-2" /> Order
            </button>
            <button className="flex items-center justify-center bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition">
              <Truck size={18} className="mr-2" /> Track
            </button>
            <button className="flex items-center justify-center bg-yellow-500 text-white p-3 rounded-lg hover:bg-yellow-600 transition">
              <Star size={18} className="mr-2" /> Rate
            </button>
            <button className="flex items-center justify-center bg-gray-700 text-white p-3 rounded-lg hover:bg-gray-800 transition">
              <Share2 size={18} className="mr-2" /> Share
            </button>
          </div>
        </div>
      );
    };

export default RewardsActions
