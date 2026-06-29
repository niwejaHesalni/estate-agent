import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PropertyCard from './PropertyCard';
import './FeaturedCarousel.css';

// Uses the real property data passed as props
function FeaturedCarousel({ properties, onAddFavourite, favourites }) {
  const navigate = useNavigate();
  const gridRef = useRef(null);

  const scrollLeft = () => {
    if (gridRef.current) {
      gridRef.current.scrollBy({ left: -380, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (gridRef.current) {
      gridRef.current.scrollBy({ left: 380, behavior: 'smooth' });
    }
  };

  return (
    <section className="fc">
      <div className="fc__header">
        <div>
          <h2 className="fc__title">Early Access</h2>
          <p className="fc__sub">Get a sneak peek at these homes before they're listed elsewhere.</p>
        </div>
        <div className="fc__arrows">
          <button className="fc__arrow" onClick={scrollLeft}>←</button>
          <button className="fc__arrow" onClick={scrollRight}>→</button>
        </div>
      </div>

      <div className="fc__grid" ref={gridRef}>
        {properties.map((prop) => (
          <PropertyCard
            key={prop.id}
            property={prop}
            onAddFavourite={onAddFavourite}
            isFavourite={favourites.some((f) => f.id === prop.id)}
          />
        ))}

        <div className="fc__card fc__see-all" onClick={() => navigate('/buy')}>
          <span>🏠 See all early access homes</span>
        </div>
      </div>
    </section>
  );
}

export default FeaturedCarousel;
