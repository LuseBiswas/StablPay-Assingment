import React from 'react'

function OrderHistory() {
    const pastOrders = [
        { id: 1, name: "Pasta", date: "2024-02-15" },
        { id: 2, name: "Tacos", date: "2024-02-10" },
      ];
      return (
        <div className="p-5 bg-white shadow rounded-lg">
          <h2 className="text-xl font-bold mb-3">Order History</h2>
          <ul>
            {pastOrders.map((order) => (
              <li key={order.id} className="p-2 border-b">
                {order.name} - <span>{order.date}</span>
              </li>
            ))}
          </ul>
        </div>
      );
    };

export default OrderHistory
