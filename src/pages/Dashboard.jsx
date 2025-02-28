import React, { useState } from "react";
import OrderForm from "../components/OrderForm";
import RecentOrders from "../components/RecentOrders";
import OrderHistory from "../components/OrderHistory";

function Dashboard() {
  const [orders, setOrders] = useState([]);

  const handleNewOrder = (newOrder) => {
    setOrders([...orders, newOrder]);
  };
  return (
    <div className="p-5 space-y-5">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <OrderForm onOrderSubmit={handleNewOrder} />
      <RecentOrders orders={orders} />
      <OrderHistory />
    </div>
  );
};

export default Dashboard;
