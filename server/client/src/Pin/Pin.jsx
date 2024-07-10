// src/Pin/Pin.js
import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
import './style.css';

function Pin({ item }) {
  // Check if item exists and has necessary properties
  if (!item || !item.lat || !item.long || !item.imageLink || !item.id || !item.country || !item.district || !item.state) {
    return null; // Return null if item is missing or has invalid properties
  }

  return (
    <Marker position={[item.lat, item.long]}>
      <Popup>
        <div className="popup-content">
          <img src={item.imageLink} alt="" />
          <div className="details">
            <Link to={`/imagedetails/${item.id}`}>{item.country}</Link>
            <span>{item.district}</span>
            <b>{item.state}</b>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}

export default Pin;
