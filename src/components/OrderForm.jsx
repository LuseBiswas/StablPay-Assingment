import React, { useState } from "react";

function OrderForm({ onOrderSubmit, darkMode }) {
  const [formData, setFormData] = useState({
    customerName: "",
    address: "",
    distance: "",
    restaurant: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewOrder, setPreviewOrder] = useState(null);
  
  const restaurants = ["Pizza Hut", "KFC", "McDonald's", "Subway", "Domino's"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error for this field when user starts typing again
    if (errors[name]) {
      setErrors({...errors, [name]: null});
    }
    
    // Update preview if distance changes
    if (name === "distance" && value && formData.restaurant) {
      updatePreview({ ...formData, [name]: value });
    } else if (name === "restaurant" && value && formData.distance) {
      updatePreview({ ...formData, [name]: value });
    }
  };

  const calculateDeliveryTime = (distance) => {
    return distance ? parseInt(distance) * 5 + 10 : "";
  };
  
  const updatePreview = (data) => {
    if (data.distance && data.restaurant) {
      const estimatedTime = calculateDeliveryTime(data.distance);
      setPreviewOrder({
        ...data,
        estimatedTime,
        status: "Preview",
      });
    } else {
      setPreviewOrder(null);
    }
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
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate network request
    setTimeout(() => {
      const estimatedTime = calculateDeliveryTime(formData.distance);

      onOrderSubmit({
        ...formData,
        estimatedTime,
        status: "In Progress",
      });

      setFormData({ customerName: "", address: "", distance: "", restaurant: "" });
      setErrors({});
      setIsSubmitting(false);
      setPreviewOrder(null);
    }, 800);
  };

  const inputClasses = `w-full p-3 border rounded-lg transition-all focus:outline-none focus:ring-2 ${
    darkMode 
      ? "bg-gray-700 text-white border-gray-600 focus:border-indigo-500 focus:ring-indigo-500/50" 
      : "bg-white text-black border-gray-300 focus:border-indigo-500 focus:ring-indigo-500/30"
  }`;

  const labelClasses = `block text-sm font-medium mb-1 ${
    darkMode ? "text-gray-300" : "text-gray-700"
  }`;

  return (
    <div className={`shadow-lg rounded-lg p-6 transition-all ${
      darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
    }`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="customerName" className={labelClasses}>
            Customer Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className={`h-5 w-5 ${darkMode ? "text-gray-500" : "text-gray-400"}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              id="customerName"
              type="text"
              name="customerName"
              placeholder="Enter your full name"
              value={formData.customerName}
              onChange={handleChange}
              className={`${inputClasses} pl-10`}
            />
          </div>
          {errors.customerName && 
            <p className="text-red-500 text-sm mt-1">{errors.customerName}</p>
          }
        </div>

        <div>
          <label htmlFor="address" className={labelClasses}>
            Delivery Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className={`h-5 w-5 ${darkMode ? "text-gray-500" : "text-gray-400"}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              id="address"
              type="text"
              name="address"
              placeholder="Enter your delivery address"
              value={formData.address}
              onChange={handleChange}
              className={`${inputClasses} pl-10`}
            />
          </div>
          {errors.address && 
            <p className="text-red-500 text-sm mt-1">{errors.address}</p>
          }
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="distance" className={labelClasses}>
              Distance (km)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className={`h-5 w-5 ${darkMode ? "text-gray-500" : "text-gray-400"}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                id="distance"
                type="number"
                name="distance"
                placeholder="Distance in km"
                value={formData.distance}
                onChange={handleChange}
                className={`${inputClasses} pl-10`}
              />
            </div>
            {errors.distance && 
              <p className="text-red-500 text-sm mt-1">{errors.distance}</p>
            }
          </div>

          <div>
            <label htmlFor="restaurant" className={labelClasses}>
              Restaurant
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className={`h-5 w-5 ${darkMode ? "text-gray-500" : "text-gray-400"}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h5a1 1 0 000-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM13 16a1 1 0 102 0v-5.586l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L13 10.414V16z" />
                </svg>
              </div>
              <select
                id="restaurant"
                name="restaurant"
                value={formData.restaurant}
                onChange={handleChange}
                className={`${inputClasses} pl-10 appearance-none`}
              >
                <option value="">Select a Restaurant</option>
                {restaurants.map((restaurant, index) => (
                  <option key={index} value={restaurant}>
                    {restaurant}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className={`h-5 w-5 ${darkMode ? "text-gray-500" : "text-gray-400"}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            {errors.restaurant && 
              <p className="text-red-500 text-sm mt-1">{errors.restaurant}</p>
            }
          </div>
        </div>
        
        {previewOrder && (
          <div className={`mt-4 p-4 rounded-lg transition-all ${
            darkMode ? "bg-gray-700" : "bg-gray-100"
          }`}>
            <h3 className="font-semibold text-sm mb-2">Estimated Delivery Time</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex flex-col">
                <div>
            
                  <p className={`${darkMode ? "text-indigo-400" : "text-indigo-600"} font-bold`}>
                    {previewOrder.estimatedTime} min
                  </p>
                </div>
              </li>
            </ul>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-6 py-3 rounded-lg w-full transition-all flex items-center justify-center font-medium ${
            darkMode 
              ? "bg-indigo-600 hover:bg-indigo-700 text-white disabled:bg-indigo-800 disabled:opacity-70" 
              : "bg-indigo-600 hover:bg-indigo-700 text-white disabled:bg-indigo-300"
          }`}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            "Place Order"
          )}
        </button>
      </form>
    </div>
  );
}

export default OrderForm;