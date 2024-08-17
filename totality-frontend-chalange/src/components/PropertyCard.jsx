import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Adjust the import based on your context setup

function PropertyCard({ properties }) {
  const [showPopup, setShowPopup] = useState(false);
  const { cart, addToCart } = useContext(AuthContext); // Use context to get cart and addToCart function
  const navigate = useNavigate();

  const handleAddToCart = (property) => {
    addToCart(property); // Add item to cart using context function
    setShowPopup(true); // Show the popup
  };

  const goToCart = () => {
    navigate('/cart');
  };

  return (
    <div className="w-full max-w-7xl mx-auto overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {properties.map((property) => (
          <div
            key={property.id}
            className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
          >
            <img
              src={property.image}
              alt={property.name}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-bold mb-2">{property.name}</h3>
            <p className="text-gray-700 mb-2">Location: {property.location}</p>
            <p className="text-gray-700 mb-2">Price: ${property.price.toLocaleString()}</p>
            <p className="text-gray-700 mb-2">Bedrooms: {property.bedrooms}</p>
            <button
              onClick={() => handleAddToCart(property)}
              className="w-full bg-blue-500 text-white py-2 rounded-md mt-4"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {showPopup && (
        <div className="fixed top-4 right-4 bg-white p-4 rounded-lg shadow-lg z-50">
          <p className="text-black font-semibold">
            You have {cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart.
          </p>
          <div className="mt-2 flex justify-between">
            <button
              onClick={goToCart}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Go to Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PropertyCard;
