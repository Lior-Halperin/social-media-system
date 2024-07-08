import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { StyledMapContainer } from "./MapWithAddresses.styled";

// Fixing marker icons not showing correctly
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

interface MapWithAddressesProps {
  addresses: {
    id: number;
    name: string;
    longitude: number;
    latitude: number;
  }[];
  mapCenterLandmark: [number, number];
}
function MapWithAddresses({addresses, mapCenterLandmark}: MapWithAddressesProps): JSX.Element {
  
  const [mapCenter, setMapCenter] = useState<[number, number]>(mapCenterLandmark);

  useEffect(() => {
    if (addresses.length > 0) {
      setMapCenter(mapCenterLandmark);
    }
  }, [addresses, mapCenterLandmark]);
  
  return (
    <>
      <StyledMapContainer
        center={mapCenter}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer // Todo - add style-component
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {addresses.map((address) => (
          <Marker position={[address.latitude, address.longitude]}>
            <Popup>{address.name}</Popup>
          </Marker>
        ))}
      </StyledMapContainer>
    </>
  );
}

export default MapWithAddresses;
