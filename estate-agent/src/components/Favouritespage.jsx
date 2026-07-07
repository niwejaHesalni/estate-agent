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
            <h2>
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" style={{ verticalAlign: 'middle', marginRight: 4 }}>
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              {favourites.length} Saved {favourites.length === 1 ? 'Property' : 'Properties'}
            </h2>
            {favourites.length > 0 && (
              <button className="search-btn reset-btn" onClick={onClear}>Clear all</button>
            )}
          </div>

          {favourites.length === 0 ? (
            <div className="no-results">
              <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="48" height="48">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </p>
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
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12" style={{ verticalAlign: 'middle', marginRight: 4 }}><path d="M18 6L6 18M6 6l12 12"/></svg>
                    Remove
                  </button>
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