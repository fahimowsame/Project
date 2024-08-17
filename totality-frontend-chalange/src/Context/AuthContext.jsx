import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import this to be used in Header

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );
    const [cart, setCart] = useState(
        JSON.parse(localStorage.getItem("cart")) || []
    );

    // User Registration
    const register = (username, email, password) => {
        const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
        const userExists = existingUsers.some(user => user.username === username || user.email === email);

        if (userExists) {
            return { success: false, message: 'Username or email already exists' };
        } else {
            const newUser = { username, email, password };
            localStorage.setItem("users", JSON.stringify([...existingUsers, newUser]));
            return { success: true };
        }
    };

    // User Login
    const login = (username, password) => {
        const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
        const user = existingUsers.find(user => (user.username === username || user.email === username) && user.password === password);

        if (user) {
            setCurrentUser(user);
            return { success: true };
        } else {
            return { success: false, message: 'Invalid username or password' };
        }
    };

    // User Logout
    const logout = (navigate) => {
        setCurrentUser(null);
        localStorage.removeItem("user");
        setCart([]); // Clear cart on logout
        localStorage.removeItem("cart");
        navigate('/');  // Redirect to home page after logout
    };

    useEffect(() => {
        if (currentUser) {
            localStorage.setItem("user", JSON.stringify(currentUser));
        } else {
            localStorage.removeItem("user");
        }
    }, [currentUser]);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    // Cart Functionality
    const addToCart = (property) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(item => item.id === property.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === property.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prevCart, { ...property, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (propertyId) => {
        setCart((prevCart) =>
            prevCart.filter((item) => item.id !== propertyId)
        );
    };

    const updateQuantity = (propertyId, action) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === propertyId
                    ? {
                        ...item,
                        quantity:
                            action === 'increase'
                                ? item.quantity + 1
                                : item.quantity > 1
                                    ? item.quantity - 1
                                    : 1,
                    }
                    : item
            )
        );
    };

    const getTotalCost = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <AuthContext.Provider
            value={{
                currentUser,
                register,
                login,
                logout, // Passing logout function
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                getTotalCost,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
