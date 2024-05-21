import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Maps from '../Map/Maps';

const ImageCard = () => {
  const { country } = useParams(); // Getting country from URL params
  const [categoryData, setCategoryData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  useEffect(() => {
    fetchData();

    // Create an intersection observer
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    }, { threshold: 1 });

    // Start observing
    observer.current.observe(document.querySelector('#observe-end'));

    // Cleanup
    return () => observer.current.disconnect();
  }, [country, hasMore]);

  useEffect(() => {
    setCategoryData([]);
    setPage(1);
  }, [country]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://flood-project-gkjp.onrender.com/api/data/country/${country}?page=${page}`);
      const newData = response.data;
      if (newData.length === 0) {
        setHasMore(false);
      }
      setCategoryData((prevData) => [...prevData, ...newData]);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col md:flex-row justify-between relative z-0 w-[375px] md:w-full'>
      <div className="mt-10 w-[300px] md:w-[450px] ml-2 grid grid-cols-1 md:grid-cols-2 gap-4 h-[800px] overflow-hidden overflow-y-auto">
        {categoryData.map((data, index) => (
          <Link key={`${data.id}-${index}`} to={`/imagedetails/${data.id}`}>
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
      <div className='map w-[350px] ml-4 mt-10 overflow-hidden'>
        <Maps items={categoryData} />
      </div>
      {loading && <div>Loading...</div>}
      <div id="observe-end" style={{ height: '10px' }}></div>
    </div>
  );
};

export default ImageCard;
