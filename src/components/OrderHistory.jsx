import React, { useState } from 'react';
import {
  Clock,
  Package,
  Check,
  ChevronDown,
  History,
  ShoppingBag,
  Eye,
  FileText,
} from 'lucide-react';

function OrderHistory({ orders }) {
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('newest');

  // Filter orders by status
  const filteredOrders = orders.filter(
    (order) => statusFilter === 'All' || order.status === statusFilter
  );

  // Sort orders based on sortBy value
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.date) - new Date(a.date);
    } else if (sortBy === 'oldest') {
      return new Date(a.date) - new Date(b.date);
    }
    return 0;
  });

  // Get status badge styling
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Delivered':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending':
        return <Clock size={16} className="mr-1" />;
      case 'In Progress':
        return <Package size={16} className="mr-1" />;
      case 'Delivered':
        return <Check size={16} className="mr-1" />;
      default:
        return null;
    }
  };

  return (
    <div className="p-5 bg-white dark:bg-gray-800 shadow-md rounded-lg transition-all">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
          <History size={20} className="mr-2 text-indigo-500" />
          Order History
        </h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {filteredOrders.length} {filteredOrders.length === 1 ? 'order' : 'orders'}
        </span>
      </div>

      {/* Filter and Sort Controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Filter Status
          </label>
          <div className="relative">
            <select
              className="w-full p-2 pl-3 pr-10 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:border-indigo-500 dark:focus:border-indigo-600 focus:outline-none appearance-none"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Orders</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Delivered">Delivered</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
              <ChevronDown size={16} />
            </div>
          </div>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Sort By
          </label>
          <div className="relative">
            <select
              className="w-full p-2 pl-3 pr-10 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:border-indigo-500 dark:focus:border-indigo-600 focus:outline-none appearance-none"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
              <ChevronDown size={16} />
            </div>
          </div>
        </div>
      </div>

      {/* Order List */}
      {sortedOrders.length > 0 ? (
        <div className="space-y-3">
          {sortedOrders.map((order, index) => (
            <div
              key={index}
              className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-750 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                  <div className="hidden sm:flex items-center justify-center h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-200 mr-3">
                    <ShoppingBag size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {order.customerName}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {order.date
                        ? new Date(order.date).toLocaleDateString()
                        : 'No date available'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(
                      order.status
                    )}`}
                  >
                    {getStatusIcon(order.status)}
                    {order.status}
                  </span>
                </div>
              </div>
              <div className="p-4 bg-white dark:bg-gray-700">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase mb-1">
                      Restaurant
                    </p>
                    <p className="text-gray-900 dark:text-white">
                      {order.restaurant || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase mb-1">
                      Delivery Time
                    </p>
                    <p className="text-gray-900 dark:text-white">
                      {order.estimatedTime} minutes
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase mb-1">
                      Order Items
                    </p>
                    <p className="text-gray-900 dark:text-white">
                      {order.items ? order.items.length : 0} items
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-600 flex justify-end">
                  <button className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 text-sm font-medium transition-colors flex items-center">
                    <Eye size={16} className="mr-1" />
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="bg-gray-100 dark:bg-gray-700 rounded-full p-3 mb-3">
            <FileText size={32} className="text-gray-500 dark:text-gray-400" />
          </div>
          <p className="text-gray-600 dark:text-gray-300 font-medium">No orders found</p>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Try changing your filter or check back later
          </p>
        </div>
      )}
    </div>
  );
}

export default OrderHistory;