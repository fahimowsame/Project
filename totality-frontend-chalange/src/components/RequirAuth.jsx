import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const RequireAuth = ({ children }) => {
    const { currentUser } = useContext(AuthContext);

    if (!currentUser) {
        // If the user is not logged in, redirect to the login page
        return <Navigate to="/login" />;
    }

    // If the user is logged in, render the child components
    return children;
};

export default RequireAuth;
