import React, { useState } from "react";
import OrderForm from "../components/OrderForm";
import RecentOrders from "../components/RecentOrders";
import OrderHistory from "../components/OrderHistory";
import OrderBreakdown from "../components/OrderBreakdown";
import RewardsActions from "../components/RewardsActions";

function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleNewOrder = (newOrder) => {
    setOrders([...orders, newOrder]);
    setSelectedOrder(newOrder);
  };
  return (
    <div className="p-5 space-y-5">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <RewardsActions />
      <OrderForm onOrderSubmit={handleNewOrder} />
      <OrderBreakdown order={selectedOrder} />
      <RecentOrders orders={orders} />
      <OrderHistory orders={orders} />
    </div>
  );
};

export default Dashboard;
