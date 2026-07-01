import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const PHOTON_PROXY = '/api/photon/api';

function LocationMap({ locations, height = '340px', mini = false, zoom = 14 }) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markersRef = useRef([]);
  const [coords, setCoords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const locs = Array.isArray(locations)
    ? locations
    : locations
      ? [{ address: locations, label: '' }]
      : [];

  useEffect(() => {
    if (locs.length === 0) {
      setLoading(false);
      setError('No location provided');
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    const fetchCoords = async () => {
      try {
        const results = await Promise.all(
          locs.map(async (loc) => {
            const addr = typeof loc === 'string' ? loc : loc.address;
            const label = typeof loc === 'string' ? '' : loc.label || '';
            const q = encodeURIComponent(addr);
            const res = await fetch(`${PHOTON_PROXY}?q=${q}&limit=1`);
            if (!res.ok) throw new Error(`Geocoding failed for "${addr}"`);
            const data = await res.json();
            if (!data.features || data.features.length === 0) {
              return null;
            }
            const [lon, lat] = data.features[0].geometry.coordinates;
            return { lat, lng: lon, label, address: addr };
          })
        );

        if (cancelled) return;

        const valid = results.filter(Boolean);
        if (valid.length === 0) {
          setError('Could not find location on map');
          setCoords(valid);
        } else {
          setCoords(valid);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchCoords();
    return () => { cancelled = true; };
  }, [JSON.stringify(locs.map(l => typeof l === 'string' ? l : l.address))]);

  useEffect(() => {
    if (loading || error || coords.length === 0 || !mapRef.current) return;

    if (mapInstance.current) {
      mapInstance.current.remove();
      mapInstance.current = null;
    }

    const map = L.map(mapRef.current, {
      zoomControl: !mini,
      attributionControl: !mini,
      scrollWheelZoom: !mini,
      dragging: !mini,
      tap: !mini,
      touchZoom: !mini,
      doubleClickZoom: !mini,
      keyboard: !mini,
    }).setView([coords[0].lat, coords[0].lng], zoom);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    markersRef.current = coords.map((c) => {
      const marker = L.marker([c.lat, c.lng]).addTo(map);
      if (c.label) {
        marker.bindPopup(c.label);
      }
      return marker;
    });

    if (coords.length > 1) {
      const group = L.featureGroup(markersRef.current);
      map.fitBounds(group.getBounds().pad(0.1));
    }

    mapInstance.current = map;

    return () => {
      map.remove();
      mapInstance.current = null;
    };
  }, [loading, error, coords, mini, zoom]);

  return (
    <div style={{ position: 'relative', width: '100%', height }}>
      {loading && (
        <div style={{
          position: 'absolute', inset: 0, display: 'flex', alignItems: 'center',
          justifyContent: 'center', background: '#e5e7eb', borderRadius: 8,
          color: '#888', fontSize: '0.9rem', zIndex: 1000,
        }}>
          Loading map...
        </div>
      )}
      {error && (
        <div style={{
          position: 'absolute', inset: 0, display: 'flex', alignItems: 'center',
          justifyContent: 'center', background: '#e5e7eb', borderRadius: 8,
          color: '#888', fontSize: '0.9rem', zIndex: 1000,
        }}>
          {error}
        </div>
      )}
      <div
        ref={mapRef}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 8,
          opacity: loading || error ? 0 : 1,
          transition: 'opacity 0.3s',
        }}
      />
    </div>
  );
}

export default LocationMap;
