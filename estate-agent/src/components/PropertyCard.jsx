import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * PropertyCard - Displays a single property listing in the results grid.
 * Supports drag-to-favourite and a favourite button.
 */
function PropertyCard({ property, onAddFavourite, isFavourite }) {
  const navigate = useNavigate();
  const cardRef = useRef(null);

  // --- Drag start: attach property id to dataTransfer ---
  const handleDragStart = (e) => {
    e.dataTransfer.setData('propertyId', property.id);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const formatPrice = (p) =>
    p.toLocaleString('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 });

  return (
    <div
      className="property-card"
      ref={cardRef}
      draggable
      onDragStart={handleDragStart}
      title="Drag to favourites"
    >
      <img src={property.picture} alt={property.location} onError={(e) => { e.target.src = 'https://placehold.co/400x200?text=Property'; }} />
      <div className="card-body">
        <h3>{property.location}</h3>
        <div className="card-price">{formatPrice(property.price)}</div>
        <div className="card-meta">
          {property.type} · {property.bedrooms} bed · {property.tenure}
        </div>
        <p className="card-desc">{property.description}</p>
      </div>
      <div className="card-actions">
        <button
          className={`btn-fav${isFavourite ? ' added' : ''}`}
          onClick={() => onAddFavourite(property)}
          disabled={isFavourite}
        >
          {isFavourite ? '★ Saved' : '♡ Favourite'}
        </button>
        <button className="btn-view" onClick={() => navigate(`/property/${property.id}`)}>
          View →
        </button>
      </div>
    </div>
  );
}

export default PropertyCard;
