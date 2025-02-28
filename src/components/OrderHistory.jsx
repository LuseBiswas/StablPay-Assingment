import React, { useState } from 'react';

function OrderHistory({ orders }) {
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredOrders = orders.filter(
    (order) => statusFilter === "All" || order.status === statusFilter
  );

  return (
    <div className="p-5 bg-white dark:bg-gray-800 shadow rounded-lg transition-all">
      <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Order History</h2>

      {/* Status Filter Dropdown */}
      <select
        className="w-full p-2 border rounded mb-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option value="All">All</option>
        <option value="In Progress">In Progress</option>
        <option value="Delivered">Delivered</option>
      </select>

      {/* Order List */}
      <ul>
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order, index) => (
            <li
              key={index}
              className="border p-3 mb-2 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <p>
                <strong>Name:</strong> {order.customerName}
              </p>
              <p>
                <strong>Status:</strong> {order.status}
              </p>
              <p>
                <strong>Delivery Time:</strong> {order.estimatedTime} mins
              </p>
            </li>
          ))
        ) : (
          <p className="text-gray-500 dark:text-gray-400">No orders found for this status.</p>
        )}
      </ul>
    </div>
  );
}

export default OrderHistory;
