import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaChevronRight, FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');
    const formData = new FormData(event.currentTarget);
    const username = formData.get('username');
    const password = formData.get('password');

    const result = login(username, password);

    if (result.success) {
      navigate('/');
    } else {
      setError(result.message);
    }

    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-200 to-purple-400">
      <div className="relative bg-gradient-to-r from-purple-700 to-purple-500 shadow-2xl rounded-xl h-[600px] w-[360px]">
        <div className="relative z-10 h-full p-10 mt-20 overflow-hidden w-full">
          <form className="space-y-6 mt-10" onSubmit={handleSubmit}>
            <div className="relative">
              <FaUser className="absolute top-3 left-0 text-purple-300" />
              <input 
                type="text" 
                name="username"
                className="pl-8 border-b-2 border-gray-300 bg-transparent text-lg font-semibold text-black focus:outline-none focus:border-purple-500 transition" 
                placeholder="User name / Email" 
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
            <button 
              type="submit"
              className="flex items-center justify-center w-full py-3 bg-white text-purple-700 font-bold rounded-full shadow-lg hover:bg-purple-100 transition"
              disabled={isLoading}
            >
              {isLoading ? 'Logging In...' : 'Log In Now'}
              <FaChevronRight className="ml-2" />
            </button>
            {error && <div className="text-red-500 text-center">{error}</div>}
          </form>
          <div className="absolute bottom-[100px] right-0 text-center text-white">
            <h3 className="mb-4">Log in via</h3>
            <div className="flex justify-center space-x-4">
              <a href="#" className="hover:scale-150 transition-transform">
                <FaInstagram />
              </a>
              <a href="#" className="hover:scale-150 transition-transform">
                <FaFacebook />
              </a>
              <a href="#" className="hover:scale-150 transition-transform">
                <FaTwitter />
              </a>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 z-0">
          <span className="absolute h-[520px] w-[520px] bg-white top-[-50px] right-[120px] rounded-tl-[72px] transform rotate-45"></span>
          <span className="absolute h-[220px] w-[220px] bg-purple-700 top-[-172px] right-0 rounded-[32px] transform rotate-45"></span>
        </div>
      </div>
    </div>
  );
};

export default Login;
