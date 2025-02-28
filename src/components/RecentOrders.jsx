import React from 'react'

function RecentOrders({ orders }) {
    
      return (
        <div className="p-5 bg-white shadow rounded-lg">
          <h2 className="text-xl font-bold mb-3">Recent Orders</h2>
          <ul>
            {orders.length === 0 ? (
              <p>No recent orders</p>
            ) : (
              orders.map((order, index) => (
                <li key={index} className="p-2 border-b">
                  <span className="font-semibold">{order.customerName}</span> - {order.status}
                  <p className="text-sm text-gray-500">
                    Estimated Time: {order.estimatedTime} minutes
                  </p>
                </li>
              ))
            )}
          </ul>
        </div>
      );
    };

export default RecentOrders
