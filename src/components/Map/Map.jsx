import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";

import { useCities } from "../../hooks/useCities";
import styles from "./Map.module.css";
import { useNavigate } from "react-router-dom";
import { useUrl } from "../../hooks/useUrl";

export default function WorldMap() {
  const [position, setPosition] = useState([27.0095, 84.87]);
  const { lat, lng } = useUrl();
  const { cities } = useCities();
  useEffect(() => {
    if (lat && lng) {
      setPosition([lat, lng]);
    }
  }, [lat, lng]);
  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
        />
        {cities.map((city) => (
          <Marker key={city.id} position={[city.position.lat, city.position.lng]}>
            <Popup>
              <span>{city.emoji}</span> <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={position} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({position}) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  const map = useMap();

  // map.on("click", (e) => {
  //     const { lat, lng } = e.latlng;
  //     navigate(`form?lat=${lat}&lng=${lng}`);
  //   });
  // another way using mapevents
  // useMapEvents({
  //   click(e) {
  //     const { lat, lng } = e.latlng;
  //     navigate(`form?lat=${lat}&lng=${lng}`);
  //   },
  // });
  
  useEffect(() => {
    map.on("click", (e) => {
      const { lat, lng } = e.latlng;
      navigate(`form?lat=${lat}&lng=${lng}`);
    });
  }, [map, navigate]);
  
  return null;
}
