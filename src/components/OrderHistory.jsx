import React from 'react'

function OrderHistory({orders}) {

  const deliveredOrders = orders.filter((order) => order.status === "Delivered");

  return (
    <div className="p-5 bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold mb-3">Order History</h2>
      {deliveredOrders.length === 0 ? (
        <p className="text-gray-500">No completed orders yet.</p>
      ) : (
        <ul className="space-y-3">
          {deliveredOrders.map((order, index) => (
            <li key={index} className="p-3 border rounded flex justify-between items-center">
              <div>
                <p className="font-semibold">{order.customerName}</p>
                <p className="text-sm text-gray-500">{order.restaurant}</p>
                <p className="text-sm text-gray-500">ETA: {order.estimatedTime} mins</p>
              </div>
              <span className="text-green-500 font-semibold">✅ Delivered</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default OrderHistory
