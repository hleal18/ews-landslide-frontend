import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import Marker from "./Marker";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export function MapWithCenter({ position, handleClick }) {
  const defaultCenter = { lat: position.lat, lng: position.lng };

  const zoom = 15;

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyANwB6gQaXT2StJWRgbR6DV4tA5cBDm2PE" }}
        defaultCenter={defaultCenter}
        center={defaultCenter}
        defaultZoom={zoom}
        onClick={handleClick}
      >
        <Marker
          lat={position.lat}
          lng={position.lng}
          text="Punto critico"
        />
      </GoogleMapReact>
    </div>
  );
}

export default function SimpleMap({ position, handleClick }) {
  const defaultCenter = { lat: 10.399, lng: -75.51 };
  const [center, setCenter] = useState({ lat: 10.399, lng: -75.51 });
  navigator.geolocation.getCurrentPosition((position) => {
    setCenter({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });
  });

  const zoom = 15;

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyANwB6gQaXT2StJWRgbR6DV4tA5cBDm2PE" }}
        defaultCenter={defaultCenter}
        center={center}
        defaultZoom={zoom}
        onClick={handleClick}
      >
        <Marker lat={position.lat} lng={position.lng} text="Punto critico" />
      </GoogleMapReact>
    </div>
  );
}
