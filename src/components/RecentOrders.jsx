import React from "react";

function RecentOrders({ orders, onUpdateStatus, darkMode }) {
  const statusOptions = ["Pending", "In Progress", "Delivered"];
  return (
    <div
      className={`p-5 shadow rounded-lg transition-all ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <h2 className="text-xl font-bold mb-3">Recent Orders</h2>
      {orders.length === 0 ? (
        <p className="text-gray-500">No recent orders.</p>
      ) : (
        <ul className="space-y-3">
          {orders.map((order, index) => (
            <li
              key={index}
              className={`p-3 border rounded flex justify-between items-center ${
                darkMode ? "border-gray-700" : "border-gray-300"
              }`}
            >
              <div>
                <p className="font-semibold">{order.customerName}</p>
                <p className="text-sm text-gray-500">{order.restaurant}</p>
                <p className="text-sm text-gray-500">ETA: {order.estimatedTime} mins</p>
              </div>
              <select
                value={order.status}
                onChange={(e) => onUpdateStatus(index, e.target.value)}
                className={`border p-1 rounded transition-all ${
                  darkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white text-black border-gray-300"
                }`}
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RecentOrders;