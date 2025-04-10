import React, { useState, useEffect } from 'react';
import './App.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix missing marker icon issue in React + Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

function App() {
  const [ip, setIp] = useState('');
  const [info, setInfo] = useState(null);

  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then(res => res.json())
      .then(data => setIp(data.ip));
  }, []);

  const getIPInfo = async () => {
    try {
      const response = await fetch(`https://ipapi.co/${ip}/json/`);
      const data = await response.json();
      setInfo(data);
    } catch (err) {
      console.error('Error fetching IP info:', err);
    }
  };

  return (
    <div className="container">
      <h1>🌐 IP Info Tracker with Map</h1>
      <input
        type="text"
        placeholder="Enter IP or domain"
        value={ip}
        onChange={(e) => setIp(e.target.value)}
      />
      <br />
      <button onClick={getIPInfo}>Get Info</button>

      {info && (
        <>
          <div className="info-box">
            <p><strong>IP:</strong> {info.ip}</p>
            <p><strong>City:</strong> {info.city}</p>
            <p><strong>Region:</strong> {info.region}</p>
            <p><strong>Country:</strong> {info.country_name}</p>
            <p><strong>ISP:</strong> {info.org}</p>
            <p><strong>ASN:</strong> {info.asn}</p>
          </div>

          {info.latitude && info.longitude && (
            <div className="map-container">
              <MapContainer
                center={[info.latitude, info.longitude]}
                zoom={10}
                style={{ height: '300px', width: '100%' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[info.latitude, info.longitude]}>
                  <Popup>{info.city || 'Location'}</Popup>
                </Marker>
              </MapContainer>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;