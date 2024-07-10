import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../Context/AuthContext';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Counter from './Counter';
import Map from '../Map/Map';

function Home() {
    const { currentUser } = useContext(AuthContext);
    const [floodData, setFloodData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('https://flood-project-ahb0.onrender.com/api/data/allpost');
            // Slice the response data to get only the first five items
            const firstFiveData = response.data.slice(0, 5);
            setFloodData(firstFiveData);
        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    };

    console.log(floodData);

    return (
        <div className='flex flex-col'>
            <div className='mt-10 ml-4'>
                <h1 className='text-2xl font-bold'>Recent Flood Activity</h1>
            </div>
            <div className='mt-10 mr-4 ml-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4'>
                {floodData.map((data) => (
                    <Link key={data.id} to={`/imagedetails/${data.id}`}>
                        <div className='shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] rounded-xl'>
                            <img className='w-full h-48 object-cover rounded-t-xl' src={data.imageLink} alt={`Image for ${data.placeName}`} />
                            <div className='p-4'>
                                <h1 className='text-xl font-bold mb-2'>{data.country}</h1>
                                <h2 className='text-sm font-bold'>{data.state}</h2>
                                <h2 className='text-sm font-bold'>{data.district}</h2>
                                <h2 className='text-sm font-bold'>{data.eventDate}</h2>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            <div className='hidden md:flex justify-center items-center mt-10 mb-10 pl-24 pr-24'>
                <div className='flex flex-row gap-[400px] bg-gray-50 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] rounded-xl h-[80px] w-full justify-center'>
                    <Counter initialCount={0} targetCount={1000} text="Total Data" />
                    <Counter initialCount={0} targetCount={150} text="Countries" />
                    <Counter initialCount={0} targetCount={300} text="Districts" />
                </div>
            </div>

            <div className='flex justify-center items-center mt-10 mb-10'>
                <div>
                    <Map items={floodData} />
                </div>
            </div>
        </div>
    );
}

export default Home;
