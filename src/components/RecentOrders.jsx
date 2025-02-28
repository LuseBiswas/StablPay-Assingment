import React, { useState } from "react";

function RecentOrders({ orders, onUpdateStatus, darkMode }) {
  const statusOptions = ["Pending", "In Progress", "Delivered"];
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  
  // Status color mapping
  const getStatusStyles = (status) => {
    switch(status) {
      case "Pending":
        return darkMode 
          ? "bg-yellow-900 text-yellow-200 border-yellow-800" 
          : "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "In Progress":
        return darkMode 
          ? "bg-blue-900 text-blue-200 border-blue-800" 
          : "bg-blue-100 text-blue-700 border-blue-300";
      case "Delivered":
        return darkMode 
          ? "bg-green-900 text-green-200 border-green-800" 
          : "bg-green-100 text-green-700 border-green-300";
      default:
        return darkMode 
          ? "bg-gray-700 text-white border-gray-600" 
          : "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  const toggleExpandOrder = (index) => {
    setExpandedOrderId(expandedOrderId === index ? null : index);
  };

  return (
    <div
      className={`p-5 shadow-md rounded-lg transition-all ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
        </svg>
        Recent Orders
      </h2>
      
      {orders.length === 0 ? (
        <div className={`flex flex-col items-center justify-center py-8 text-center ${
          darkMode ? "text-gray-400" : "text-gray-500"
        }`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <p>No recent orders.</p>
          <p className="text-sm mt-1">Orders will appear here when you place them.</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {orders.map((order, index) => (
            <li
              key={index}
              className={`border rounded-lg transition-all overflow-hidden ${
                darkMode ? "border-gray-700 hover:border-gray-600" : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div 
                className={`p-4 cursor-pointer flex justify-between items-center ${
                  darkMode ? "hover:bg-gray-750" : "hover:bg-gray-50"
                }`}
                onClick={() => toggleExpandOrder(index)}
              >
                <div className="flex items-center">
                  <div className={`w-10 h-10 flex items-center justify-center rounded-full mr-3 ${
                    getStatusStyles(order.status).split(' ').slice(0, 2).join(' ')
                  }`}>
                    {order.status === "Pending" && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                    {order.status === "In Progress" && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    )}
                    {order.status === "Delivered" && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-lg">{order.customerName}</p>
                    <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                      {order.restaurant}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className={`px-3 py-1 rounded-full text-sm font-medium mr-3 ${getStatusStyles(order.status)}`}>
                    {order.status}
                  </div>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-5 w-5 transform transition-transform ${expandedOrderId === index ? 'rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              
              {expandedOrderId === index && (
                <div className={`p-4 border-t ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className={`text-xs font-medium mb-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                        ESTIMATED TIME
                      </p>
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="font-semibold">{order.estimatedTime} minutes</p>
                      </div>
                    </div>
                    <div>
                      <p className={`text-xs font-medium mb-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                        ORDER STATUS
                      </p>
                      <select
                        value={order.status}
                        onChange={(e) => onUpdateStatus(index, e.target.value)}
                        className={`w-full border rounded-lg py-2 px-3 focus:ring-2 focus:outline-none transition-all ${
                          darkMode 
                            ? "bg-gray-700 border-gray-600 focus:border-indigo-500 focus:ring-indigo-800 text-white" 
                            : "bg-white border-gray-300 focus:border-indigo-500 focus:ring-indigo-200"
                        }`}
                      >
                        {statusOptions.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex justify-between mt-2">
                    <button 
                      className={`px-4 py-2 rounded-lg flex items-center text-sm transition-all ${
                        darkMode 
                          ? "bg-gray-700 hover:bg-gray-600 text-white" 
                          : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                      }`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                      Track Order
                    </button>
                    <button 
                      className={`px-4 py-2 rounded-lg flex items-center text-sm transition-all ${
                        darkMode 
                          ? "bg-indigo-600 hover:bg-indigo-700 text-white" 
                          : "bg-indigo-100 hover:bg-indigo-200 text-indigo-700"
                      }`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      Contact Customer
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RecentOrders;