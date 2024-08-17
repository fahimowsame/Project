import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Header() {
    const { currentUser, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/'); // Redirect to the home page after logout
    };

    return (
        <nav className="flex justify-between items-center h-20 px-6 sm:px-10 fixed w-full z-10 bg-opacity-30 backdrop-blur-lg shadow-lg text-gray-700 uppercase mb-20 rounded-lg">
            <div className="font-extrabold text-lg">Logo</div>
            <div className="flex flex-wrap md:flex-nowrap md:space-x-6 items-center relative">
                <Link
                    to="/"
                    className="font-bold md:text-lg text-[8px] mr-[4px] cursor-pointer transform hover:-translate-y-1 transition-transform duration-200 ease-in-out"
                >
                    HOME
                </Link>
                <div className="relative">
                    <p
                        className="font-bold md:text-lg text-[8px] mr-[4px] cursor-pointer transform hover:-translate-y-1 transition-transform duration-200 ease-in-out"
                    >
                        PROPERTIES
                    </p>
                </div>
                <Link
                    to="/"
                    className="font-bold md:text-lg text-[8px] mr-[4px] cursor-pointer transform hover:-translate-y-1 transition-transform duration-200 ease-in-out"
                >
                    AGENTS
                </Link>
                <Link
                    to="/"
                    className="md:text-lg text-[8px] mr-[4px] cursor-pointer transform hover:-translate-y-1 transition-transform duration-200 ease-in-out font-bold"
                >
                    BLOGS
                </Link>
                <div className="flex items-center">
                    {currentUser ? (
                        <>
                            <span className="font-bold md:text-lg text-[8px] mr-[4px]">
                                {currentUser.username}
                            </span>
                            <button
                                onClick={handleLogout}
                                className="font-bold md:text-lg text-[8px] mr-[4px] cursor-pointer transform hover:-translate-y-1 transition-transform duration-200 ease-in-out border border-gray-400 px-2 sm:px-4 py-1 sm:py-2 rounded-lg bg-white bg-opacity-20"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">
                                <button className="md:text-lg text-[8px] mr-[4px] cursor-pointer transform hover:-translate-y-1 transition-transform duration-200 ease-in-out border border-gray-400 px-2 sm:px-4 py-1 sm:py-2 rounded-lg bg-white bg-opacity-20 font-bold">
                                    Signin
                                </button>
                            </Link>
                            <Link to="/signup">
                                <button className="md:text-lg text-[8px] mr-[4px] cursor-pointer transform hover:-translate-y-1 transition-transform duration-200 ease-in-out border border-gray-400 px-2 sm:px-4 py-1 sm:py-2 rounded-lg bg-white bg-opacity-20 font-bold">
                                    Signup
                                </button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Header;
