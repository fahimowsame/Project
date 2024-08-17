import React, { useState } from 'react';

const Checkout = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
        postalCode: '',
        country: '',
        cardNumber: '',
        expiryDate: '',
        cvv: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle the form submission, e.g., sending data to the server
        console.log('Form data submitted:', formData);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 pt-28">
            <div className="bg-white p-8 shadow-md w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-6">Checkout</h2>
                <form onSubmit={handleSubmit}>
                    <h3 className="text-lg font-bold mb-2">Contact Information</h3>
                    <div className="mb-4">
                        <label className="block text-gray-700">Name</label>
                        <input 
                            type="text" 
                            name="name" 
                            value={formData.name} 
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input 
                            type="email" 
                            name="email" 
                            value={formData.email} 
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Address</label>
                        <input 
                            type="text" 
                            name="address" 
                            value={formData.address} 
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">City</label>
                        <input 
                            type="text" 
                            name="city" 
                            value={formData.city} 
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Postal Code</label>
                        <input 
                            type="text" 
                            name="postalCode" 
                            value={formData.postalCode} 
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Country</label>
                        <input 
                            type="text" 
                            name="country" 
                            value={formData.country} 
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>

                    <h3 className="text-lg font-bold mb-2">Payment Information</h3>
                    <div className="mb-4">
                        <label className="block text-gray-700">Card Number</label>
                        <input 
                            type="text" 
                            name="cardNumber" 
                            value={formData.cardNumber} 
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="flex space-x-4">
                        <div className="mb-4 w-1/2">
                            <label className="block text-gray-700">Expiry Date</label>
                            <input 
                                type="text" 
                                name="expiryDate" 
                                value={formData.expiryDate} 
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                                required
                                placeholder="MM/YY"
                            />
                        </div>
                        <div className="mb-4 w-1/2">
                            <label className="block text-gray-700">CVV</label>
                            <input 
                                type="text" 
                                name="cvv" 
                                value={formData.cvv} 
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                    </div>
                    <button 
                        type="submit" 
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded"
                    >
                        Submit Payment
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Checkout;
