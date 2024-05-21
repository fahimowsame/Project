import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
// import MapComponent from './MapComponent';

function ImageDetails() {
    const { id } = useParams();
    const [image, setImage] = useState({});
    const [coordinate, setCoordinate] = useState(null);

    async function downloadImage() {
        try {
            const response = await axios.get(`https://flood-project-gkjp.onrender.com/api/data/${id}`);
            const imageData = response.data;
            if (imageData) {
                setImage({
                    image: imageData.imageLink,
                    country: imageData.country,
                    district: imageData.district,
                    latitude: imageData.lat,
                    longitude: imageData.long,
                    source: imageData.source,
                    sensor: imageData.sensor,
                    eventDate: imageData.eventDate,
                    imageryDate: imageData.imageryDate,
                    placeName: imageData.placeName,
                    state: imageData.state
                });
                // Set coordinates if available
                if (imageData.lat && imageData.long) {
                    setCoordinate({ latitude: imageData.lat, longitude: imageData.long });
                }
            } else {
                console.error('No image found with the provided id:', id);
            }
        } catch (error) {
            console.error('Error fetching image details:', error);
        }
    }

    const openGoogleEarthEngine = () => {
        if (coordinate) {
            const { latitude, longitude } = coordinate;
    
            // Open Google Earth Engine
            const googleEarthEngineUrl = 'https://code.earthengine.google.com/';
            const googleEarthEngineWindow = window.open(googleEarthEngineUrl, '_blank');
    
            // Add a marker to the map once Google Earth Engine is loaded
            googleEarthEngineWindow.onload = () => {
                const codeEditor = googleEarthEngineWindow.document.getElementById('editor');
                const script = googleEarthEngineWindow.document.createElement('script');
                script.textContent = `
                    // Import Earth Engine
                    var ee = googleEarthEngineWindow.EarthEngine;
    
                    // Create a point geometry
                    var point = ee.Geometry.Point(${longitude}, ${latitude});
    
                    // Create a marker by adding a point layer with a red color
                    Map.addLayer(point, {color: 'FF0000'}, 'Marker');
                    
                    // Center the map on the marker
                    Map.centerObject(point, 10);
                `;
                codeEditor.appendChild(script);
            };
        } else {
            console.error('Coordinate not available');
        }
    };
    
    
    

    useEffect(() => {
        downloadImage();
    }, [id]);

    return (
        <div className=' h-full flex justify-center flex-col items-center'>
            <div className='flex flex-col md:flex-row justify-center items-center w-[300px] h-[450px] md:w-[1000px] md:h-[500px] bg-blue-800 text-white rounded-2xl mt-10'>
                <div className='md:w-[500px] md:h-[400px] w-[200px] h-[150px]'>
                    <img className='h-full w-full rounded-2xl' src={image.image} alt='Image' />
                </div>
                <div className=' flex justify-center items-start flex-col ml-8 font-bold md:text-xl text-sm'>
                    <h1>Country: {image.country}</h1>
                    <p>State: {image.state}</p>
                    <p>District: {image.district}</p>
                    <p>Place Name: {image.placeName}</p>
                    <p>Latitude: {image.latitude}</p>
                    <p>Longitude: {image.longitude}</p>
                    <p>Source: {image.source}</p>
                    <p>Sensor: {image.sensor}</p>
                    <p>Event Date: {image.eventDate}</p>
                    <p>Imagery Date: {image.imageryDate}</p>
                    <p>Image Link: <a href={image.image} target="_blank" rel="noopener noreferrer" className="underline">View Full Image</a></p>
                    <div className='cursor-pointer '>
                        <button onClick={openGoogleEarthEngine} className='underline'>Go to Google Earth Engine</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ImageDetails;
