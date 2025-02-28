import React, { useEffect, useState } from "react";

function OrderBreakdown({ order, darkMode }) {
  if (!order) return null;

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (order.status === "Delivered") {
      setProgress(100);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => (prev + 10 >= 100 ? 100 : prev + 10));
    }, 1000);

    return () => clearInterval(interval);
  }, [order.status]);

  return (
    <div
      className={`p-5 shadow rounded-lg transition-all ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <h2 className="text-xl font-bold mb-3">Delivery Breakdown</h2>
      <ul className="space-y-2">
        <li>📦 <strong>Preparation Time:</strong> {Math.floor(order.estimatedTime * 0.3)} min</li>
        <li>🚗 <strong>Transit Time:</strong> {Math.floor(order.estimatedTime * 0.7)} min</li>
        <li>⏳ <strong>Estimated Delivery:</strong> {order.estimatedTime} min</li>
      </ul>

      <div
        className={`w-full rounded-full h-3 mt-4 transition-all ${
          darkMode ? "bg-gray-700" : "bg-gray-200"
        }`}
      >
        <div
          className="bg-green-500 h-3 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <p className={`mt-2 text-sm transition-all ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
        {progress < 100 ? "Order is in progress..." : "Delivered ✅"}
      </p>
    </div>
  );
}

export default OrderBreakdown;
