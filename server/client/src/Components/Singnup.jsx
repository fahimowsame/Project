import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
// import {apiRequest} from '../library/apiRequest.js';
import axios from 'axios';

function Signup() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true)
    const formData = new FormData(event.target);
    const username = formData.get('username')
    const email = formData.get('email')
    const password = formData.get('password')

    try {
        // const apiRequest = axios.create({baseUrl : 'http://localhost:8800/api', withCredentials : true });
        const res = await axios.post("https://flood-project-ahb0.onrender.com/api/auth/register", {
            username, email, password
        })
        navigate("/login")
    } catch (error) {
        setError(error.response.data.message)
    }finally{
        setIsLoading(false)
    }
  };

  return (
    <div className="flex  justify-center items-center">
      <div className="flex-3 bg-white w-[400px] h-[350px]  border border-teal-500 rounded-lg">
        <div className="flex flex-col h-full items-center justify-center">
          <form onSubmit={handleSubmit} className="w-3/4">
            <h1 className="text-3xl font-bold mb-6">Create an Account</h1>
            <input name="username" type="text" placeholder="Username" className="mt-3 p-1 w-[250px] border border-gray-300 rounded" />
            <input name="email" type="text" placeholder="Email" className="mt-3 p-1 w-[250px] border border-gray-300 rounded" />
            <input name="password" type="password" placeholder="Password" className="border border-gray-300 rounded mt-3 p-1 w-[250px]" />
            <button type="submit" disabled={isLoading} className="  p-1 bg-teal-500 rounded-lg w-[250px] text-white mt-3 ">
              {isLoading ? 'Loading...' : 'Register'}
            </button>
            {error && <span className="text-red-500">{error}</span>}
            <div className="mt-3">
                Do you have an account?
                <Link to="/login" className="underline text-blue-500">
                Login here
                </Link>
          </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
