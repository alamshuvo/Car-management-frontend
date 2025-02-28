

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Button } from "@/components/ui/button";
import { FaGooglePlay, FaAppStore } from "react-icons/fa";

// Custom marker icon
const customIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const locations = [
  { lat: 40.7128, lng: -74.006, label: "New York" },
  { lat: 34.0522, lng: -118.2437, label: "Los Angeles" },
  { lat: 41.8781, lng: -87.6298, label: "Chicago" },
  { lat: 29.7604, lng: -95.3698, label: "Houston" },
  { lat: 25.7617, lng: -80.1918, label: "Miami" },
];

const ServiceSection = () => {
  return (
    <section className="grid lg:grid-cols-2 gap-8 lg:p-8 p-4 bg-colorsa-background ">
      {/* Left Section */}
      <div className="flex flex-col justify-center">
        <h2 className="text-3xl font-bold mb-4">Check Out Our Service</h2>
        <p className="text-gray-600 mb-4">
          Neque eu velit sit neque morbi faucibus indiam maximus ligula aptent
          consequat tempus sapien platea nibh. Eu dis dictumst risus senectus ex
          sollicitudin massa aliquet.
        </p>
        <Button className="bg-colorsa-secondary text-white px-6 py-2 rounded-lg shadow-md">
          Find A Location
        </Button>

        {/* App Install Section */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold">
            Install Our App And Simplify Your Journey
          </h3>
          <p className="text-gray-500 text-sm">
            Easy navigation and smooth, hassle-free trips.
          </p>
          <div className="flex gap-4 mt-4">
            <Button variant="outline" className="flex gap-2 items-center">
              <FaAppStore className="text-xl" /> App Store
            </Button>
            <Button variant="outline" className="flex gap-2 items-center">
              <FaGooglePlay className="text-xl" /> Google Play
            </Button>
          </div>
        </div>
      </div>

      {/* Right Section - Leaflet Map */}
      <div className="lg:h-[500px] h-[200px]">
        <MapContainer center={[37.7749, -122.4194]} zoom={4} className="h-full w-full rounded-lg shadow-lg">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {locations.map((loc, index) => (
            <Marker key={index} position={[loc.lat, loc.lng]} icon={customIcon}>
              <Popup>{loc.label}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </section>
  );
};

export default ServiceSection;
