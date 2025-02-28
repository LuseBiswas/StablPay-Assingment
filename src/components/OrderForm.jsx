import React, { useState } from "react";

function OrderForm({ onOrderSubmit }) {
  const [formData, setFormData] = useState({
    customerName: "",
    address: "",
    distance: "",
    restaurant: "", // New field for restaurant selection
  });

  const [errors, setErrors] = useState({});

  const restaurants = ["Pizza Hut", "KFC", "McDonald's", "Subway", "Domino's"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calculateDeliveryTime = (distance) => {
    return distance ? parseInt(distance) * 5 + 10 : "";
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.customerName.trim()) {
      newErrors.customerName = "Customer name is required.";
    } else if (!/^[a-zA-Z\s]+$/.test(formData.customerName)) {
      newErrors.customerName = "Only letters are allowed.";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required.";
    } else if (formData.address.length < 5) {
      newErrors.address = "Address must be at least 5 characters long.";
    }

    if (!formData.distance) {
      newErrors.distance = "Distance is required.";
    } else if (parseFloat(formData.distance) <= 0) {
      newErrors.distance = "Distance must be greater than 0.";
    }

    if (!formData.restaurant) {
      newErrors.restaurant = "Please select a restaurant.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const estimatedTime = calculateDeliveryTime(formData.distance);

    onOrderSubmit({
      ...formData,
      estimatedTime,
      status: "In Progress",
    });

    setFormData({ customerName: "", address: "", distance: "", restaurant: "" });
    setErrors({});
  };

  return (
    <div className="p-5 bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold mb-3">Place an Order</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <input
            type="text"
            name="customerName"
            placeholder="Customer Name"
            value={formData.customerName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.customerName && (
            <p className="text-red-500 text-sm">{errors.customerName}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            name="address"
            placeholder="Delivery Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.address && (
            <p className="text-red-500 text-sm">{errors.address}</p>
          )}
        </div>

        <div>
          <input
            type="number"
            name="distance"
            placeholder="Distance (km)"
            value={formData.distance}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.distance && (
            <p className="text-red-500 text-sm">{errors.distance}</p>
          )}
        </div>

        <div>
          <select
            name="restaurant"
            value={formData.restaurant}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Select a Restaurant</option>
            {restaurants.map((restaurant, index) => (
              <option key={index} value={restaurant}>
                {restaurant}
              </option>
            ))}
          </select>
          {errors.restaurant && (
            <p className="text-red-500 text-sm">{errors.restaurant}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Place Order
        </button>
      </form>
    </div>
  );
}

export default OrderForm;
