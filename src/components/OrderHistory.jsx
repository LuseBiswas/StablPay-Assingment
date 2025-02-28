import React, { useState } from 'react'

function OrderHistory({ orders }) {
  const [selectedOrder, setSelectedOrder] = useState(null);
  return (
    <div className="p-5 bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold mb-3">Order History</h2>

      {orders.length === 0 ? (
        <p className="text-gray-500">No past orders yet.</p>
      ) : (
        <ul className="space-y-3">
          {orders.map((order, index) => (
            <li
              key={index}
              className={`p-3 border rounded-lg cursor-pointer ${
                selectedOrder === order ? "bg-blue-100" : "hover:bg-gray-100"
              }`}
              onClick={() => setSelectedOrder(order)}
            >
              <div className="flex justify-between items-center">
                <span className="font-semibold">{order.foodItem}</span>
                <span
                  className={`text-sm px-2 py-1 rounded ${
                    order.status === "Delivered"
                      ? "bg-green-200 text-green-800"
                      : "bg-yellow-200 text-yellow-800"
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <p className="text-sm text-gray-500">Est. Time: {order.estimatedTime} min</p>
            </li>
          ))}
        </ul>
      )}

      {selectedOrder && (
        <div className="mt-5 p-4 border-t">
          <h3 className="font-bold text-lg">Order Details</h3>
          <p>🍽️ <strong>Food Item:</strong> {selectedOrder.foodItem}</p>
          <p>⏳ <strong>Estimated Time:</strong> {selectedOrder.estimatedTime} min</p>
          <p>🚗 <strong>Status:</strong> {selectedOrder.status}</p>
        </div>
      )}
    </div>
  );
};
export default OrderHistory
