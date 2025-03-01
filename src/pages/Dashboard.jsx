import React, { useEffect, useState } from "react";
import RewardsActions from "../components/RewardsActions";
import OrderBreakdown from "../components/OrderBreakdown";
import RecentOrders from "../components/RecentOrders";
import OrderHistory from "../components/OrderHistory";
import Sidebar from "../components/Sidebar";

function Dashboard({ darkMode, setDarkMode }) {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  //Fetching from Local Storage of Previous Orders
  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);

  useEffect(() => {
    if (orders.length > 0) {
      localStorage.setItem("orders", JSON.stringify(orders));
    }
  }, [orders]);

  const handleNewOrder = (newOrder) => {
    const orderWithStatus = {
      ...newOrder,
      status: "In Progress",
      orderId: Date.now(),
    };
    setOrders((prevOrders) => [orderWithStatus, ...prevOrders]);
    setSelectedOrder(orderWithStatus);
  };

  const handleUpdateStatus = (index, newStatus) => {
    const updatedOrders = orders.map((order, i) =>
      i === index ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    if (selectedOrder && selectedOrder.orderId === orders[index].orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  const clearOrderHistory = () => {
    localStorage.removeItem("orders");
    setOrders([]);
    setSelectedOrder(null);
  };

  return (
    <div className="flex w-full">
      {/* Sidebar Component */}
      <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />
      
      {/* Main Content */}
      <div
        className={`flex-1 transition-all min-h-screen ${
          darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
        }`}
      >
        <div className="p-3 md:p-5 space-y-4 md:space-y-5 max-h-screen overflow-y-auto">
          <div className="flex justify-between items-center">
            <h1 className="text-xl md:text-2xl font-bold">Dashboard</h1>
          </div>

          <RewardsActions darkMode={darkMode} onOrderSubmit={handleNewOrder} />

          {selectedOrder && (
            <OrderBreakdown order={selectedOrder} darkMode={darkMode} />
          )}

          <RecentOrders
            orders={orders}
            onUpdateStatus={handleUpdateStatus}
            darkMode={darkMode}
          />

          <OrderHistory orders={orders} darkMode={darkMode} />

          {orders.length > 0 && (
            <button
              onClick={clearOrderHistory}
              className={`px-4 py-2 rounded transition-all ${
                darkMode
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-red-500 text-white hover:bg-red-600"
              }`}
            >
              Clear Order History
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;