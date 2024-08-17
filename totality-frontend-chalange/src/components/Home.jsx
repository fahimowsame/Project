import React, { useState } from 'react';
import PropertyCard from './PropertyCard';

const Home = () => {
  const [activeButton, setActiveButton] = useState('Rent');
  const [selectedLocation, setSelectedLocation] = useState(''); 
  const [filteredProperties, setFilteredProperties] = useState([]); 

  const properties = [
    {
      id: 1,
      name: 'Modern Apartment',
      location: 'New York',
      price: 200000,
      bedrooms: 2,
      image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      reviews: ['Great place!', 'Loved the view.'], // Add initial reviews here
    },
    {
      id: 2,
      name: 'Luxury Villa',
      location: 'Los Angeles',
      price: 450000,
      bedrooms: 4,
      image: 'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      reviews: ['Spacious and luxurious.'], // Add initial reviews here
    },
    {
      id: 3,
      name: 'Cozy House',
      location: 'Chicago',
      price: 300000,
      bedrooms: 3,
      image: 'https://images.pexels.com/photos/209296/pexels-photo-209296.jpeg?auto=compress&cs=tinysrgb&w=600',
      reviews: ['Felt like home.'], // Add initial reviews here
    },
  ];
  

  const handleSearch = () => {
    if (selectedLocation) {
      const filtered = properties.filter(
        (property) => property.location === selectedLocation
      );
      setFilteredProperties(filtered);
    } else {
      setFilteredProperties(properties);
    }
  };
  // const [favorites, setFavorites] = useState([]);

  // Function to handle adding a property to favorites
  const handleAddToFavorites = (property) => {
    setFavorites([...favorites, property]);
  };

  return (
    <div className="bg-red-500 min-h-screen flex flex-col items-center justify-center px-4 sm:px-10">
      <div className="w-full max-w-7xl mx-auto overflow-hidden">
        {/* Main Content Section */}
        <div className="relative w-full h-[500px] bg-yellow-500 flex flex-col md:flex-row items-center justify-between mt-24 rounded-3xl">
          <div className="md:w-1/2 text-center md:text-left p-6 sm:pl-10 z-9">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Easy way to find a perfect
              <br />
              <span className='inline-block animate-typewriter py-1'>Property</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 w-full md:w-[450px]">
              We provide a complete service for the sale, purchase, or rental of real estate.
            </p>
            <div className="rounded-lg shadow-lg p-6 mt-10 mx-auto max-w-[900px] relative z-9">
              {/* Button Group */}
              <div className="flex justify-center md:justify-start space-x-2">
                <button
                  onClick={() => setActiveButton('Rent')}
                  className={`px-4 py-2 rounded-l-lg font-medium ${
                    activeButton === 'Rent' ? 'bg-blue-500 text-white' : ' text-gray-700'
                  }`}
                >
                  Rent
                </button>
                <button
                  onClick={() => setActiveButton('Buy')}
                  className={`px-4 py-2 font-medium ${
                    activeButton === 'Buy' ? 'bg-blue-500 text-white' : ' text-gray-700'
                  }`}
                >
                  Buy
                </button>
                <button
                  onClick={() => setActiveButton('Sell')}
                  className={`px-4 py-2 rounded-r-lg font-medium ${
                    activeButton === 'Sell' ? 'bg-blue-500 text-white' : ' text-gray-700'
                  }`}
                >
                  Sell
                </button>
              </div>

              {/* Form Fields */}
              <div className="flex flex-col md:flex-row justify-between items-center md:space-x-4 bg-white p-2 mt-4 md:mt-0">
                <div className="w-full md:w-auto">
                  <select
                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg w-full"
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    value={selectedLocation}
                  >
                    <option value="">Select Your City</option>
                    <option value="New York">New York</option>
                    <option value="Los Angeles">Los Angeles</option>
                    <option value="Chicago">Chicago</option>
                  </select>
                </div>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full md:w-auto mt-4 md:mt-0"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0 relative">
            <div className="absolute w-full md:w-[600px] md:h-[500px] md:top-[-250px] md:right-[-80px] overflow-hidden rounded-lg">
              <img 
                src="https://filesblog.technavio.org/wp-content/webp-express/webp-images/uploads/2018/12/Online-House-Rental-Sites-672x372.jpg.webp" 
                alt="House" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Property Cards Section */}
        <PropertyCard properties={filteredProperties.length ? filteredProperties : properties} />
        <div className="flex justify-center items-center mt-10">
          <h1 className="text-2xl font-bold w-[300px] text-center">
            We are Available in Many well Known Countries
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10 px-4 sm:px-16 md:px-56 mb-10">
          <div className="w-full h-[350px] bg-blue-700 rounded-2xl relative overflow-hidden transition-transform duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50">
            <img
              className="w-full h-full object-cover transition-transform duration-300 transform hover:scale-105"
              src="https://images.pexels.com/photos/13819269/pexels-photo-13819269.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="India"
            />
            <h1 className="absolute bottom-4 left-4 text-white text-xl font-bold">
              INDIA
            </h1>
          </div>
          <div className="w-full h-[350px] bg-blue-700 rounded-2xl relative overflow-hidden transition-transform duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50">
            <img
              className="w-full h-full object-cover transition-transform duration-300 transform hover:scale-105"
              src="https://images.pexels.com/photos/2193300/pexels-photo-2193300.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Australia"
            />
            <h1 className="absolute bottom-4 left-4 text-white text-xl font-bold">
              AUSTRALIA
            </h1>
          </div>
          <div className="w-full h-[350px] bg-blue-700 rounded-2xl relative overflow-hidden transition-transform duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50">
            <img
              className="w-full h-full object-cover transition-transform duration-300 transform hover:scale-105"
              src="https://images.pexels.com/photos/52502/map-south-america-atlas-52502.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="South Africa"
            />
            <h1 className="absolute bottom-4 left-4 text-white text-xl font-bold">
              SOUTH AFRICA
            </h1>
          </div>
        </div>
        {/* <FavoritesList favoriteProperties={favorites} /> */}
      </div>
    </div>
  );
};

export default Home;
