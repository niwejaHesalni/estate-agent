import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FeaturedCarousel.css';

// Uses the real property data passed as props
function FeaturedCarousel({ properties, onAddFavourite, favourites }) {
  const [page, setPage] = useState(0);
  const navigate = useNavigate();
  const perPage = 3;
  const totalPages = Math.ceil((properties.length + 1) / perPage); // +1 for "see all" card

  const start = page * perPage;
  const visible = properties.slice(start, start + perPage);
  const showSeeAll = start + perPage >= properties.length;

  const fmt = (p) =>
    p.toLocaleString('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 });

  return (
    <section className="fc">
      <div className="fc__header">
        <div>
          <h2 className="fc__title">Early Access</h2>
          <p className="fc__sub">Get a sneak peek at these homes before they're listed elsewhere.</p>
        </div>
        <div className="fc__arrows">
          <button className="fc__arrow" onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0}>←</button>
          <button className="fc__arrow" onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1}>→</button>
        </div>
      </div>

      <div className="fc__grid">
        {visible.map((prop) => {
          const isFav = favourites.some((f) => f.id === prop.id);
          return (
            <div key={prop.id} className="fc__card" onClick={() => navigate(`/property/${prop.id}`)}>
              <div className="fc__img-wrap">
                <img
                  src={prop.picture}
                  alt={prop.location}
                  onError={(e) => { e.target.src = 'https://placehold.co/400x260?text=Property'; }}
                />
                <span className="fc__badge fc__badge--ea">EARLY ACCESS</span>
                <span className="fc__badge fc__badge--soon">COMING SOON</span>
              </div>
              <div className="fc__info">
                <div className="fc__price-row">
                  <span className="fc__price">{fmt(prop.price)}</span>
                  <div className="fc__actions">
                    <button className="fc__icon-btn" title="Share" onClick={(e) => e.stopPropagation()}>⤴</button>
                    <button
                      className={`fc__icon-btn${isFav ? ' fc__icon-btn--fav' : ''}`}
                      title="Favourite"
                      onClick={(e) => { e.stopPropagation(); onAddFavourite(prop); }}
                    >♥</button>
                  </div>
                </div>
                <p className="fc__meta">{prop.bedrooms} beds · {prop.type} · {prop.tenure}</p>
                <p className="fc__addr">{prop.location}</p>
              </div>
            </div>
          );
        })}

        {showSeeAll && (
          <div className="fc__card fc__see-all" onClick={() => navigate('/')}>
            <span>🏠 See all early access homes</span>
          </div>
        )}
      </div>

      {/* Dots */}
      <div className="fc__dots">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button key={i} className={`fc__dot${i === page ? ' active' : ''}`} onClick={() => setPage(i)} />
        ))}
      </div>
    </section>
  );
}

export default FeaturedCarousel;
