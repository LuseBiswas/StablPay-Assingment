import React from "react";
import { Package, Truck, CheckCircle } from "lucide-react";
import { useDeliveryCalculator } from "../hooks/useDeliveryCalculator";

function OrderBreakdown({ order, darkMode }) {
  if (!order) return null;

  const { progress, deliveryPhase, timeRemaining, calculateDeliveryBreakdown } = useDeliveryCalculator(order);
  const { prepTime, transitTime } = calculateDeliveryBreakdown();

  return (
    <div
      className={`p-4 sm:p-6 shadow-lg rounded-lg transition-all ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Header unchanged */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
        <h2 className="text-lg sm:text-xl font-bold">Delivery Status</h2>
        <div
          className={`text-sm mt-2 sm:mt-0 ${
            deliveryPhase === "Delivered"
              ? "text-green-500"
              : darkMode
              ? "text-indigo-400"
              : "text-indigo-600"
          }`}
        >
          <span className="font-semibold">{deliveryPhase}</span>
          {deliveryPhase !== "Delivered" && (
            <span className="ml-2">• {timeRemaining} min remaining</span>
          )}
        </div>
      </div>

      {/* Progress bar unchanged */}
      <div className="relative mb-6">
        <div
          className={`w-full rounded-full h-2 transition-all ${
            darkMode ? "bg-gray-700" : "bg-gray-200"
          }`}
        >
          <div
            className={`h-2 rounded-full transition-all ${
              deliveryPhase === "Delivered"
                ? "bg-green-500"
                : darkMode
                ? "bg-indigo-600"
                : "bg-indigo-600"
            }`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-1">
          <div className="flex flex-col items-center">
            <div
              className={`w-3 h-3 rounded-full ${
                progress >= 0
                  ? deliveryPhase === "Delivered"
                    ? "bg-green-500"
                    : "bg-indigo-600"
                  : darkMode
                  ? "bg-gray-700"
                  : "bg-gray-300"
              }`}
            ></div>
            <span
              className={`text-xs mt-1 text-center max-w-12 ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Prep
            </span>
          </div>
          <div className="flex flex-col items-center">
            <div
              className={`w-3 h-3 rounded-full ${
                progress >= 33
                  ? deliveryPhase === "Delivered"
                    ? "bg-green-500"
                    : "bg-indigo-600"
                  : darkMode
                  ? "bg-gray-700"
                  : "bg-gray-300"
              }`}
            ></div>
            <span
              className={`text-xs mt-1 text-center max-w-12 ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Transit
            </span>
          </div>
          <div className="flex flex-col items-center">
            <div
              className={`w-3 h-3 rounded-full ${
                progress >= 66
                  ? deliveryPhase === "Delivered"
                    ? "bg-green-500"
                    : "bg-indigo-600"
                  : darkMode
                  ? "bg-gray-700"
                  : "bg-gray-300"
              }`}
            ></div>
            <span
              className={`text-xs mt-1 text-center max-w-12 ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Arriving
            </span>
          </div>
          <div className="flex flex-col items-center">
            <div
              className={`w-3 h-3 rounded-full ${
                progress >= 100
                  ? "bg-green-500"
                  : darkMode
                  ? "bg-gray-700"
                  : "bg-gray-300"
              }`}
            ></div>
            <span
              className={`text-xs mt-1 text-center max-w-12 ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Delivered
            </span>
          </div>
        </div>
      </div>

      {/* Delivery details */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
        <div
          className={`p-3 sm:p-4 rounded-lg transition-all ${
            darkMode ? "bg-gray-700" : "bg-gray-100"
          }`}
        >
          <h3 className="font-semibold text-sm sm:text-base mb-2">
            Delivery Breakdown
          </h3>
          <ul className="flex flex-row flex-wrap gap-4">
            <li className="flex items-center flex-1 min-w-[120px]">
              <Package className="mr-2 flex-shrink-0 w-5 h-5" />
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-medium">
                  Preparation Time
                </p>
                <p
                  className={`text-xs sm:text-sm ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {prepTime} min
                </p>
              </div>
            </li>
            <li className="flex items-center flex-initial min-w-[120px] ">
              <Truck className="mr-2 flex-shrink-0 w-5 h-5" />
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-medium">Transit Time</p>
                <p
                  className={`text-xs sm:text-sm ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {transitTime} min
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div
          className={`p-3 sm:p-4 rounded-lg transition-all ${
            darkMode ? "bg-gray-700" : "bg-gray-100"
          }`}
        >
          <h3 className="font-semibold text-sm sm:text-base mb-2">
            Delivery Details
          </h3>
          <div className="flex flex-row flex-wrap gap-4">
            <div className="flex-1 min-w-[120px]">
              <p className="text-xs sm:text-sm font-medium">
                Estimated Arrival
              </p>
              <p
                className={`text-xs sm:text-sm ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {deliveryPhase === "Delivered"
                  ? "Delivered"
                  : `${timeRemaining} minutes`}
              </p>
            </div>
            <div className="flex-1 min-w-[120px]">
              <p className="text-xs sm:text-sm font-medium">Delivery Status</p>
              <p
                className={`text-xs sm:text-sm font-medium ${
                  deliveryPhase === "Delivered"
                    ? "text-green-500"
                    : darkMode
                    ? "text-indigo-400"
                    : "text-indigo-600"
                }`}
              >
                {deliveryPhase}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Success message unchanged */}
      {deliveryPhase === "Delivered" && (
        <div className="mt-3 sm:mt-4 p-2 sm:p-3 rounded-lg bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400 flex items-center justify-center text-xs sm:text-sm">
          <CheckCircle className="mr-2 w-5 h-5" />
          <span className="font-medium">
            Your order has been delivered successfully!
          </span>
        </div>
      )}
    </div>
  );
}

export default OrderBreakdown;
