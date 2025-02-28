import React, { useEffect, useState } from "react";
import OrderForm from "../components/OrderForm";
import RecentOrders from "../components/RecentOrders";
import OrderHistory from "../components/OrderHistory";
import OrderBreakdown from "../components/OrderBreakdown";
import RewardsActions from "../components/RewardsActions";

function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedPage, setSelectedPage] = useState("Dashboard");

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders"));
    if (savedOrders) {
      setOrders(savedOrders);
    }
  }, []);

  // Save orders to Local Storage whenever they change
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
    localStorage.removeItem("orders"); // Remove orders from Local Storage
    setOrders([]); // Clear state
    setSelectedOrder(null); // Reset selected order
  };

  const handleUpdateStatus = (index, newStatus) => {
    const updatedOrders = orders.map((order, i) =>
      i === index ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
  };

  return (
    <div className="p-5 space-y-5">
      <h1 className="text-2xl font-bold">{selectedPage}</h1>
      <RewardsActions />
      <OrderForm onOrderSubmit={handleNewOrder} />
      <OrderBreakdown order={selectedOrder} />
      <RecentOrders orders={orders} onUpdateStatus={handleUpdateStatus} />
      <OrderHistory orders={orders} />
      <button
        onClick={clearOrderHistory}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Clear Order History
      </button>
    </div>
  );
}

export default Dashboard;
