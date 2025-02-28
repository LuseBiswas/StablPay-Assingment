import React, { useEffect, useState } from 'react'

function OrderBreakdown({ order }) {
    if (!order) return null;

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (order.status === "Delivered") {
      setProgress(100);
    } else {
      const interval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 100 : prev + 10));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [order.status]);

  return (
    <div className="p-5 bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold mb-3">Delivery Breakdown</h2>
      <ul className="space-y-2">
        <li>📦 **Preparation Time:** {Math.floor(order.estimatedTime * 0.3)} min</li>
        <li>🚗 **Transit Time:** {Math.floor(order.estimatedTime * 0.7)} min</li>
        <li>⏳ **Estimated Delivery:** {order.estimatedTime} min</li>
      </ul>

      <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
        <div
          className="bg-green-500 h-3 rounded-full transition-all"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <p className="mt-2 text-sm text-gray-600">
        {progress < 100 ? "Order is in progress..." : "Delivered ✅"}
      </p>
    </div>
  );
};

export default OrderBreakdown
