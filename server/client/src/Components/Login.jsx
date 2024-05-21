import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext';

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { updateUser } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(""); // Clear any previous errors
    const formData = new FormData(event.target);
    const username = formData.get('username');
    const password = formData.get('password');
  
    try {
      const res = await axios.post("https://flood-project-gkjp.onrender.com/api/auth/login", {
        username,
        password
      });

      updateUser(res.data)
  
      // Assuming the login was successful, navigate to the home page
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Handle invalid credentials error
        setError("Invalid username or password. Please try again.");
      } else {
        // Handle other errors
        setError("An error occurred while logging in. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  
  

  return (
    <div className=" flex justify-center items-center">
      <div className="flex-3 flex items-center justify-center w-[350px] h-[350px] border border-teal-500 rounded-lg">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <h1 className='text-3xl font-bold mb-6'>Welcome back</h1>
          <input
            name="username"
            required
            minLength={3}
            maxLength={20}
            type="text"
            placeholder="Username"
            className="p-2 w-[250px] border border-gray-300 rounded"
          />
          <input
            name="password"
            type="password"
            required
            placeholder="Password"
            className="p-2 w-[250px] border border-gray-300 rounded"
          />
          <button
            disabled={isLoading}
            className={`p-2 w-[250px] rounded bg-teal-500 text-white font-bold ${
              isLoading ? 'bg-gray-400 cursor-not-allowed' : ''
            }`}
          >
            Login
          </button>
          <div className="">
            
            Don't you have an account?{' '}
            <Link to="/register" className="underline text-blue-500">
              Register here
            </Link>
            <br />
            {error && <span className="text-red-500">{error}</span>}
          </div>
        </form>
      </div>
      <div className="imgContainer flex-2 bg-fcf5f3 flex items-center justify-center">
        <img src="/bg.png" alt="" className="w-full" />
      </div>
    </div>
  );
};

export default LoginPage;
