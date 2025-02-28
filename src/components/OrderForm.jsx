import React, { useState } from 'react'

function OrderForm({ onOrderSubmit }) {
    const [formData, setFormData] = useState({
        customerName: "",
        address: "",
        distance: "",
        estimatedTime: "",
      });

      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const calculateDeliveryTime = (distance) => {
        return distance ? parseInt(distance) * 5 + 10 : "";
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
    
        if (!formData.customerName || !formData.address || !formData.distance) {
          alert("Please fill in all fields.");
          return;
        }
    
        const estimatedTime = calculateDeliveryTime(formData.distance);
        setFormData({ ...formData, estimatedTime });
    
        onOrderSubmit({
          ...formData,
          estimatedTime,
          status: "In Progress",
        });
      };

  return (
    <div className="p-5 bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold mb-3">Place an Order</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="customerName"
          placeholder="Customer Name"
          value={formData.customerName}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Delivery Address"
          value={formData.address}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="distance"
          placeholder="Distance (km)"
          value={formData.distance}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        {formData.estimatedTime && (
          <p className="text-green-500">
            Estimated Delivery Time: {formData.estimatedTime} minutes
          </p>
        )}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};


export default OrderForm
