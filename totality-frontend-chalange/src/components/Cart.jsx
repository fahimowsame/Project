import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const { cart, updateQuantity, removeFromCart, getTotalCost } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleAddMoreItems = () => {
        navigate('/'); // Redirects to the home page
    };

    const handleCheckout = () => {
        navigate('/checkout'); // Redirects to the checkout page
    };

    return (
        <div className='flex justify-center items-center'>
            <div className="bg-white p-4 shadow-md mb-4 mt-28 w-[500px]">
                <h2 className="text-xl font-bold mb-4">Cart</h2>
                {cart.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    cart.map((item) => (
                        <div key={item.id} className="flex justify-between items-center mb-4">
                            <div>
                                <h3 className="text-lg font-bold">{item.name}</h3>
                                <p className="text-gray-700">Price: ${item.price.toLocaleString()}</p>
                                <p className="text-gray-700">Quantity: {item.quantity}</p>
                            </div>
                            <div className="flex">
                                <button onClick={() => updateQuantity(item.id, 'increase')} className="bg-blue-500 text-white py-1 px-2 rounded-l">
                                    +
                                </button>
                                <button onClick={() => updateQuantity(item.id, 'decrease')} className="bg-blue-500 text-white py-1 px-2">
                                    -
                                </button>
                                <button onClick={() => removeFromCart(item.id)} className="bg-red-500 text-white py-1 px-2 rounded-r">
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))
                )}
                <div className="text-right font-bold">Total: ${getTotalCost().toLocaleString()}</div>
                <button 
                    onClick={handleAddMoreItems} 
                    className="mt-4 bg-green-500 text-white py-2 px-4 rounded w-full"
                >
                    Add More Items
                </button>
                {cart.length > 0 && (
                    <button 
                        onClick={handleCheckout} 
                        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded w-full"
                    >
                        Checkout
                    </button>
                )}
            </div>
        </div>
    );
};

export default Cart;
