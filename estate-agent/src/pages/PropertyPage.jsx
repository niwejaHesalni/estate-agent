import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import properties from '../data/properties';

/**
 * PropertyPage - Detailed view of a single property.
 * Features:
 *  - Image gallery with thumbnails (6-8 images)
 *  - React Tabs: Description, Floor Plan, Google Map
 *  - Add to Favourites button
 */
function PropertyPage({ favourites, onAddFavourite }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const property = properties.find((p) => p.id === id);
  const [activeImg, setActiveImg] = useState(0);

  if (!property) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem' }}>
        <p>Property not found.</p>
        <button onClick={() => navigate('/')}>← Back to Search</button>
      </div>
    );
  }

  const isFavourite = favourites.some((f) => f.id === property.id);

  const formatPrice = (p) =>
    p.toLocaleString('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 });

  // Encode strings to prevent XSS when rendering user-supplied data
  const encode = (str) =>
    String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');

  // Google Maps embed URL using encoded location
  const mapQuery = encodeURIComponent(property.location);
  const mapSrc = `https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${mapQuery}`;

  return (
    <div className="property-page">
      <button onClick={() => navigate('/')} style={{ marginBottom: '1rem', background: 'none', border: 'none', color: '#1a3c5e', fontWeight: 600, fontSize: '0.9rem' }}>
        ← Back to Search
      </button>

      {/* Property Header */}
      <div className="property-header">
        <div>
          <h1>{encode(property.location)}</h1>
          <p className="property-meta">
            {property.type} · {property.bedrooms} Bedrooms · {property.tenure}
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div className="property-price">{formatPrice(property.price)}</div>
          <button
            className={`fav-btn${isFavourite ? ' added' : ''}`}
            onClick={() => onAddFavourite(property)}
            disabled={isFavourite}
          >
            {isFavourite ? '★ Saved to Favourites' : '♡ Add to Favourites'}
          </button>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="property-gallery">
        <div className="gallery-main">
          <img
            src={property.pictures[activeImg]}
            alt={`Property image ${activeImg + 1}`}
            onError={(e) => { e.target.src = `https://placehold.co/800x420?text=Image+${activeImg + 1}`; }}
          />
        </div>
        <div className="gallery-thumbs">
          {property.pictures.map((pic, i) => (
            <img
              key={i}
              src={pic}
              alt={`Thumbnail ${i + 1}`}
              className={i === activeImg ? 'active' : ''}
              onClick={() => setActiveImg(i)}
              onError={(e) => { e.target.src = `https://placehold.co/80x60?text=${i + 1}`; }}
            />
          ))}
        </div>
      </div>

      {/* React Tabs: Description / Floor Plan / Map */}
      <Tabs>
        <TabList>
          <Tab>Description</Tab>
          <Tab>Floor Plan</Tab>
          <Tab>Map</Tab>
        </TabList>

        <TabPanel>
          <h3 style={{ marginBottom: '0.5rem', color: '#1a3c5e' }}>About this property</h3>
          <p style={{ lineHeight: 1.8 }}>{encode(property.description)}</p>
          <p style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: '#6b7280' }}>
            Added: {property.added.day} {property.added.month} {property.added.year}
          </p>
        </TabPanel>

        <TabPanel>
          <img
            src={property.floorplan}
            alt="Floor plan"
            style={{ maxHeight: '400px', margin: '0 auto' }}
            onError={(e) => { e.target.src = 'https://placehold.co/600x400?text=Floor+Plan'; }}
          />
        </TabPanel>

        <TabPanel>
          <div className="map-placeholder">
            {/* 
              To embed a real Google Map, replace YOUR_GOOGLE_MAPS_API_KEY 
              in the mapSrc variable above with a valid key.
            */}
            <p>📍 {encode(property.location)}</p>
          </div>
          {/* Uncomment once you have an API key:
          <iframe
            title="Property Location"
            src={mapSrc}
            width="100%"
            height="300"
            style={{ border: 0, borderRadius: '8px' }}
            allowFullScreen
            loading="lazy"
          /> */}
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default PropertyPage;
