import React from 'react'

function RecentOrders() {
    const orders = [
        { id: 1, name: "Pizza", status: "In Progress" },
        { id: 2, name: "Burger", status: "Delivered" },
        { id: 3, name: "Sushi", status: "In Progress" },
      ];
      return (
        <div className="p-5 bg-white shadow rounded-lg">
          <h2 className="text-xl font-bold mb-3">Recent Orders</h2>
          <ul>
            {orders.map((order) => (
              <li key={order.id} className="p-2 border-b">
                {order.name} - <span className="font-semibold">{order.status}</span>
              </li>
            ))}
          </ul>
        </div>
      );
    };

export default RecentOrders
