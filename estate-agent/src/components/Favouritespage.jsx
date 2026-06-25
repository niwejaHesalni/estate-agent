import React from 'react';
import Hero from '../components/Hero';
import PropertyCard from '../components/PropertyCard';

function FavouritesPage({ favourites, onAddFavourite, onRemoveFavourite, onClear }) {
  return (
    <>
      <Hero title={"Your Favourites"} subtitle="Properties you've saved — all in one place." />
      <div className="page-layout page-layout--full">
        <section className="results-area" style={{ gridColumn: '1 / -1' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2>♥ {favourites.length} Saved {favourites.length === 1 ? 'Property' : 'Properties'}</h2>
            {favourites.length > 0 && (
              <button className="search-btn reset-btn" onClick={onClear}>Clear all</button>
            )}
          </div>

          {favourites.length === 0 ? (
            <div className="no-results">
              <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>♡</p>
              <p>You haven't saved any properties yet.</p>
              <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#888' }}>
                Click the heart icon on any property to save it here.
              </p>
            </div>
          ) : (
            <div className="results-grid">
              {favourites.map((p) => (
                <div key={p.id} style={{ position: 'relative' }}>
                  <PropertyCard
                    property={p}
                    onAddFavourite={onAddFavourite}
                    isFavourite={true}
                  />
                  <button
                    className="fav-remove-card"
                    onClick={() => onRemoveFavourite(p.id)}
                    title="Remove from favourites"
                  >✕ Remove</button>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
}

export default FavouritesPage;