import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaChevronRight } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';

function Signup() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { register } = useContext(AuthContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.currentTarget);
    const username = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');

    const result = register(username, email, password);

    if (result.success) {
      navigate('/login');
    } else {
      setError(result.message);
    }

    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-200 to-purple-400">
      <div className="relative bg-gradient-to-r from-purple-700 to-purple-500 shadow-2xl rounded-xl h-[600px] w-[360px]">
        <div className="relative z-10 h-full p-10 mt-20 overflow-hidden w-full">
          <form onSubmit={handleSubmit} className="space-y-6 mt-10">
            <div className="relative">
              <FaUser className="absolute top-3 left-0 text-purple-300" />
              <input
                type="text"
                name="username"
                className="pl-8 border-b-2 border-gray-300 bg-transparent text-lg font-semibold text-black focus:outline-none focus:border-purple-500 transition"
                placeholder="User name"
                required
              />
            </div>
            <div className="relative">
              <FaUser className="absolute top-3 left-0 text-purple-300" />
              <input
                type="email"
                name="email"
                className="pl-8 border-b-2 border-gray-300 bg-transparent text-lg font-semibold text-black focus:outline-none focus:border-purple-500 transition"
                placeholder="Email"
                required
              />
            </div>
            <div className="relative">
              <FaLock className="absolute top-3 left-0 text-purple-300" />
              <input
                type="password"
                name="password"
                className="pl-8 border-b-2 border-gray-300 bg-transparent text-lg font-semibold text-black focus:outline-none focus:border-purple-500 transition"
                placeholder="Password"
                required
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <button
              type="submit"
              className="flex items-center justify-center w-full py-3 bg-white text-purple-700 font-bold rounded-full shadow-lg hover:bg-purple-100 transition"
            >
              {isLoading ? 'Loading...' : 'Register'}
              <FaChevronRight className="ml-2" />
            </button>
          </form>
        </div>
        <div className="absolute inset-0 z-0">
          <span className="absolute h-[520px] w-[520px] bg-white top-[-50px] right-[120px] rounded-tl-[72px] transform rotate-45"></span>
          <span className="absolute h-[220px] w-[220px] bg-purple-700 top-[-172px] right-0 rounded-[32px] transform rotate-45"></span>
        </div>
      </div>
    </div>
  );
}

export default Signup;
