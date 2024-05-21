import React, { useContext, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from "../Context/AuthContext.jsx";
import { categories } from '../utils/constant.js';

const Header = () => {
    const { currentUser } = useContext(AuthContext);
    const [isExpandedData, setIsExpandedData] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const toggleExpandData = () => {
      setIsExpandedData(!isExpandedData);
    };

    const handleDataClick = (event) => {
      event.stopPropagation(); // Prevent the click event from bubbling up to the outer div
    };

    const handleNameClick = (name) => {
        navigate(`/imagecard/${name}`); // Pass the country name as a parameter
        setIsExpandedData(false);
    };
      

    const filteredCategories = categories.filter(category =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="sticky top-0 z-10 flex flex-row items-center justify-between h-[80px] px-2 md:px-5 bg-teal-500 mb-2 ">
            <div className="flex items-center">
                <div>
                    <h1 className="md:text-xl text-sm text-black font-bold">Flood Data</h1>
                </div>
            </div>
            <div className="flex justify-between items-center gap-2 md:gap-8">
                <div className="md:text-xl text-sm text-black font-bold cursor-pointer hover:text-white">
                    Home
                </div>
                <div className="md:text-xl text-sm text-black   cursor-pointer relative" onClick={toggleExpandData}>
                    <h1 className="hover:text-white font-bold ">Data</h1>
                    {isExpandedData && (
                        <div className="absolute top-[40px] left-[-80px] w-[200px] max-h-[300px] bg-fuchsia-600 border border-gray-400 text-white p-4 overflow-y-auto overflow-hidden  rounded-md shadow-md" onClick={handleDataClick}>
                            <input
                              type="text"
                              placeholder="Search..."
                              className="w-full px-2 py-1 mb-2 border rounded text-black"
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            {filteredCategories.map((category, index) => (
                                <div
                                  key={index}
                                  className="mb-2 cursor-pointer hover:bg-slate-700"
                                  onClick={() => handleNameClick(category.name)}
                                >
                                    {category.name}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="md:text-xl text-sm text-black font-bold cursor-pointer hover:text-white">
                    About
                </div>
                <div className="md:text-xl text-sm text-black font-bold cursor-pointer hover:text-white">
                    Contact
                </div>
            </div>
           
            <div className="flex items-center">
                {currentUser ? (
                    <div className="user flex items-center font-bold mr-2">
                        <span className=" mr-2">{currentUser.username}</span>
                        <Link to="/profile" className="profile px-2 md:px-4 md:py-2 bg-yellow-400 rounded cursor-pointer">
                            Profile
                        </Link>
                    </div>
                ) : (
                    <>
                        <Link to="/login" className="w-[60px] bg-yellow-400 rounded cursor-pointer mr-2 pl-1 h-[30px] mt-[10px] mb-[10px]">Sign in</Link>
                        <Link to="/register" className="w-[60px] bg-green-400 rounded cursor-pointer pl-1 h-[30px] mt-[10px] mb-[10px]">Sign up</Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default Header;
