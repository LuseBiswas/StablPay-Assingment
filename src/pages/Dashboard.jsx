import React, { useEffect, useState } from "react";
import OrderForm from "../components/OrderForm";
import RecentOrders from "../components/RecentOrders";
import OrderHistory from "../components/OrderHistory";
import OrderBreakdown from "../components/OrderBreakdown";
import RewardsActions from "../components/RewardsActions";

function Dashboard({ darkMode, setDarkMode }) {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedPage, setSelectedPage] = useState("Dashboard");

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders"));
    if (savedOrders) {
      setOrders(savedOrders);
    }
  }, []);

  useEffect(() => {
    if (orders.length > 0) {
      localStorage.setItem("orders", JSON.stringify(orders));
    }
  }, [orders]);

  const handleNewOrder = (newOrder) => {
    setOrders([...orders, newOrder]);
    setSelectedOrder(newOrder);
  };

  const clearOrderHistory = () => {
    localStorage.removeItem("orders");
    setOrders([]);
    setSelectedOrder(null);
  };

  const handleUpdateStatus = (index, newStatus) => {
    const updatedOrders = orders.map((order, i) =>
      i === index ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
  };

  return (
    <div className={`p-5 space-y-5 transition-all ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{selectedPage}</h1>
      </div>

      <RewardsActions darkMode={darkMode} />
      <OrderForm onOrderSubmit={handleNewOrder} darkMode={darkMode} />
      <OrderBreakdown order={selectedOrder} darkMode={darkMode} />
      <RecentOrders orders={orders} onUpdateStatus={handleUpdateStatus} darkMode={darkMode} />
      <OrderHistory orders={orders} darkMode={darkMode} />

      <button
        onClick={clearOrderHistory}
        className={`px-4 py-2 rounded transition-all ${
          darkMode ? "bg-red-600 text-white hover:bg-red-700" : "bg-red-500 text-white hover:bg-red-600"
        }`}
      >
        Clear Order History
      </button>
    </div>
  );
}

export default Dashboard;
