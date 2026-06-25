import React from 'react';
import { useNavigate } from 'react-router-dom';
import './FeedSection.css';

function FeedSection({ properties, onAddFavourite, favourites }) {
  const navigate = useNavigate();

  const fmt = (p) =>
    p.toLocaleString('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 });

  return (
    <section className="feed">
      <div className="feed__inner">
        <h2 className="feed__title">Feed</h2>
        <div className="feed__grid">
          {properties.map((prop) => {
            const isFav = favourites.some((f) => f.id === prop.id);
            return (
              <div key={prop.id} className="feed__card" onClick={() => navigate(`/property/${prop.id}`)}>
                <div className="feed__img-wrap">
                  <img
                    src={prop.picture}
                    alt={prop.location}
                    onError={(e) => { e.target.src = 'https://placehold.co/400x260?text=Property'; }}
                  />
                  <div className="feed__map-btn" title="View on map">⊞</div>
                </div>
                <div className="feed__info">
                  <div className="feed__price-row">
                    <span className="feed__price">{fmt(prop.price)}</span>
                    <div className="feed__actions">
                      <button className="feed__icon-btn" onClick={(e) => e.stopPropagation()} title="Share">⤴</button>
                      <button
                        className={`feed__icon-btn${isFav ? ' feed__icon-btn--fav' : ''}`}
                        onClick={(e) => { e.stopPropagation(); onAddFavourite(prop); }}
                        title="Save"
                      >♥</button>
                    </div>
                  </div>
                  <p className="feed__meta">
                    <span className="feed__meta-beds">{prop.bedrooms} beds</span>
                    <span className="feed__meta-baths"> · {prop.type}</span>
                    <span className="feed__meta-sqft feed__sqft"> · {prop.tenure}</span>
                  </p>
                  <p className="feed__addr">{prop.location}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="feed__see-more">
          <button className="feed__see-more-btn">See all listings</button>
        </div>
      </div>
    </section>
  );
}

export default FeedSection;
