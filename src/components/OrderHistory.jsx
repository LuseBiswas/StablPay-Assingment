import React, { useState } from 'react'

function OrderHistory({orders}) {

  const [statusFilter, setStatusFilter] = useState("All");

  const filteredOrders = orders.filter((order) => 
    statusFilter === "All" || order.status === statusFilter
  );

  const deliveredOrders = orders.filter((order) => order.status === "Delivered");

  return (
    <div className="p-5 bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold mb-3">Order History</h2>

      {/* Status Filter Dropdown */}
      <select
        className="w-full p-2 border rounded mb-3"
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
            <li key={index} className="border p-3 mb-2 rounded">
              <p><strong>Name:</strong> {order.customerName}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Delivery Time:</strong> {order.estimatedTime} mins</p>
            </li>
          ))
        ) : (
          <p className="text-gray-500">No orders found for this status.</p>
        )}
      </ul>
    </div>
  );
}

export default OrderHistory
