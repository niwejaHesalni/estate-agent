import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropertyCard from './PropertyCard';
import './FeedSection.css';

function FeedSection({ properties, onAddFavourite, favourites }) {
  const navigate = useNavigate();

  return (
    <section className="feed">
      <div className="feed__inner">
        <h2 className="feed__title">Feed</h2>
        <div className="feed__grid">
          {properties.map((prop) => (
            <PropertyCard
              key={prop.id}
              property={prop}
              onAddFavourite={onAddFavourite}
              isFavourite={favourites.some((f) => f.id === prop.id)}
            />
          ))}
        </div>
        <div className="feed__see-more">
          <button className="feed__see-more-btn">See all listings</button>
        </div>
      </div>
    </section>
  );
}

export default FeedSection;
