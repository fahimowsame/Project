import { Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";

function Pin({ item }) {
    // Check if item exists and has necessary properties
    if (!item || !item.lat || !item.long || !item.imageLink || !item.id || !item.country || !item.district || !item.state) {
      return null; // Return null if item is missing or has invalid properties
    }
  
    // Convert coordinates from degrees, minutes, and seconds (DMS) to decimal degrees
  
    return (
      <Marker position={[item.lat, item.long]}>
        <Popup>
          <div className="flex gap-[20px]">
            <img className="w-[64px] h-[48px] object-cover rounded-md" src={item.imageLink} alt="" />
            <div className="flex flex-col justify-between">
              <Link to={`/imagedetails/${item.id}`}>{item.country}</Link>
              <span>{item.district}</span>
              <b> {item.state}</b>
            </div>
          </div>
        </Popup>
      </Marker>
    );
}

export default Pin;
