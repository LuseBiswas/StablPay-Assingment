import React, { useState } from 'react';
import OrderForm from './OrderForm';

function RewardsActions({ darkMode, onOrderSubmit }) {
    const [rewardPoints, setRewardPoints] = useState(1250);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOrderSubmit = (orderData) => {
        onOrderSubmit(orderData); // Pass the order data up to Dashboard
        setIsModalOpen(false); // Close the modal
        setRewardPoints(prev => prev - 50); // Deduct some points for the order
    };

    return (
        <div className={`shadow-md rounded-lg p-4 md:p-5 mb-4 md:mb-5 transition-all ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
        }`}>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
                <div>
                    <p className="text-gray-500 text-sm">My reward points</p>
                    <h2 className="text-xl md:text-2xl font-bold">{rewardPoints} pts</h2>
                </div>
                <div className="flex w-full sm:w-auto space-x-2 md:space-x-3">
                    <button 
                        className={`flex-1 sm:flex-none px-4 md:px-6 py-2 rounded-full flex items-center justify-center transition-all ${
                            darkMode ? "bg-indigo-600 hover:bg-indigo-700" : "bg-indigo-100 text-indigo-600 hover:bg-indigo-200"
                        }`}
                        onClick={() => setIsModalOpen(true)}
                    >
                        <span>Order</span>
                    </button>
                    <button className={`flex-1 sm:flex-none px-4 md:px-6 py-2 rounded-full flex items-center justify-center transition-all ${
                        darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"
                    }`}>
                        <span>Track</span>
                    </button>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className={`p-4 md:p-5 rounded-lg shadow-lg w-full max-w-md ${
                        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
                    }`}>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-bold">Place an Order</h2>
                            <button 
                                onClick={() => setIsModalOpen(false)} 
                                className="text-red-500 hover:text-red-700 text-xl"
                            >
                                &times;
                            </button>
                        </div>
                        <OrderForm 
                            onOrderSubmit={handleOrderSubmit}
                            darkMode={darkMode}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default RewardsActions;