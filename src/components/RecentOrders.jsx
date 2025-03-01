import React, { useState } from 'react';
import {
  Clock,
  Package,
  Check,
  ChevronDown,
  MapPin,
  MessageCircle,
  ShoppingBag,
} from 'lucide-react';

function RecentOrders({ orders, onUpdateStatus, darkMode }) {
  const statusOptions = ['Pending', 'In Progress', 'Delivered'];
  const [expandedOrderId, setExpandedOrderId] = useState(null);


  const getStatusStyles = (status) => {
    switch (status) {
      case 'Pending':
        return darkMode
          ? 'bg-yellow-900 text-yellow-200 border-yellow-800'
          : 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'In Progress':
        return darkMode
          ? 'bg-blue-900 text-blue-200 border-blue-800'
          : 'bg-blue-100 text-blue-700 border-blue-300';
      case 'Delivered':
        return darkMode
          ? 'bg-green-900 text-green-200 border-green-800'
          : 'bg-green-100 text-green-700 border-green-300';
      default:
        return darkMode
          ? 'bg-gray-700 text-white border-gray-600'
          : 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const toggleExpandOrder = (index) => {
    setExpandedOrderId(expandedOrderId === index ? null : index);
  };

  return (
    <div
      className={`p-5 shadow-md rounded-lg transition-all ${
        darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'
      }`}
    >
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <Package size={20} className="mr-2 text-indigo-500" />
        Recent Orders
      </h2>

      {orders.length === 0 ? (
        <div
          className={`flex flex-col items-center justify-center py-8 text-center ${
            darkMode ? 'text-gray-400' : 'text-gray-500'
          }`}
        >
          <ShoppingBag size={48} className="mb-3 opacity-50" />
          <p>No recent orders.</p>
          <p className="text-sm mt-1">Orders will appear here when you place them.</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {orders.map((order, index) => (
            <li
              key={index}
              className={`border rounded-lg transition-all overflow-hidden ${
                darkMode ? 'border-gray-700 hover:border-gray-600' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div
                className={`p-4 cursor-pointer flex justify-between items-center ${
                  darkMode ? 'hover:bg-gray-750' : 'hover:bg-gray-50'
                }`}
                onClick={() => toggleExpandOrder(index)}
              >
                <div className="flex items-center">
                  <div
                    className={`w-10 h-10 flex items-center justify-center rounded-full mr-3 ${
                      getStatusStyles(order.status).split(' ').slice(0, 2).join(' ')
                    }`}
                  >
                    {order.status === 'Pending' && <Clock size={20} />}
                    {order.status === 'In Progress' && <Package size={20} />}
                    {order.status === 'Delivered' && <Check size={20} />}
                  </div>
                  <div>
                    <p className="font-semibold text-lg">{order.customerName}</p>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {order.restaurant}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div
                    className={`px-3 py-1 rounded-full text-sm font-medium mr-3 ${getStatusStyles(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </div>
                  <ChevronDown
                    size={20}
                    className={`transform transition-transform ${
                      expandedOrderId === index ? 'rotate-180' : ''
                    }`}
                  />
                </div>
              </div>

              {expandedOrderId === index && (
                <div
                  className={`p-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p
                        className={`text-xs font-medium mb-1 ${
                          darkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}
                      >
                        ESTIMATED TIME
                      </p>
                      <div className="flex items-center">
                        <Clock size={16} className="mr-1 text-indigo-500" />
                        <p className="font-semibold">{order.estimatedTime} minutes</p>
                      </div>
                    </div>
                    <div>
                      <p
                        className={`text-xs font-medium mb-1 ${
                          darkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}
                      >
                        ORDER STATUS
                      </p>
                      <select
                        value={order.status}
                        onChange={(e) => onUpdateStatus(index, e.target.value)}
                        className={`w-full border rounded-lg py-2 px-3 focus:ring-2 focus:outline-none transition-all ${
                          darkMode
                            ? 'bg-gray-700 border-gray-600 focus:border-indigo-500 focus:ring-indigo-800 text-white'
                            : 'bg-white border-gray-300 focus:border-indigo-500 focus:ring-indigo-200'
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
                          ? 'bg-gray-700 hover:bg-gray-600 text-white'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                      }`}
                    >
                      <MapPin size={16} className="mr-1" />
                      Track Order
                    </button>
                    <button
                      className={`px-4 py-2 rounded-lg flex items-center text-sm transition-all ${
                        darkMode
                          ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                          : 'bg-indigo-100 hover:bg-indigo-200 text-indigo-700'
                      }`}
                    >
                      <MessageCircle size={16} className="mr-1" />
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