import React from 'react'
import {MapContainer, TileLayer, Marker} from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import Pin from '../Pin/Pin';



function Map({ items }) {
  // Check if items is undefined or null, and set a default empty array if so
  if (!items) {
      items = [];
  }

  return (
      <MapContainer
          center={
              items.length === 1
                  ? [items?.lat, items?.long] // Access the first item's lat and long properties
                  : [52.4797, -1.90269]
          }
          zoom={1}
          scrollWheelZoom={true}
          className="h-[400px] md:w-[800px] w-[400px]"
      >
          <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {items.map((item) => (
              <Pin item={item} key={item.id} />
          ))}
      </MapContainer>
  );
}

export default Map;


