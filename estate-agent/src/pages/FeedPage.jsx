import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import PropertyCard from '../components/PropertyCard';
import FavouritesSidebar from '../components/FavouritesSidebar';
import properties from '../data/properties';

function FeedPage({ favourites, onAddFavourite, onRemoveFavourite, onClear }) {
  const navigate = useNavigate();
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minBed, setMinBed] = useState('');
  const [type, setType] = useState('any');

  const filtered = properties.filter((p) => {
    if (type !== 'any' && p.type !== type) return false;
    if (minPrice && p.price < Number(minPrice)) return false;
    if (maxPrice && p.price > Number(maxPrice)) return false;
    if (minBed && p.bedrooms < Number(minBed)) return false;
    return true;
  });

  return (
    <>
      <Hero title={"Property Feed"} subtitle="The latest listings — updated daily." />
      <FavouritesSidebar
        favourites={favourites}
        allProperties={properties}
        onAddFavourite={onAddFavourite}
        onRemoveFavourite={onRemoveFavourite}
        onClear={onClear}
        layout="horizontal"
      />
      <div className="page-layout">
        <aside className="filter-panel">
          <h3>Filter</h3>
          <div className="form-group">
            <label>Type</label>
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="any">Any</option>
              <option value="House">House</option>
              <option value="Flat">Flat</option>
            </select>
          </div>
          <div className="form-group">
            <label>Min Price (£)</label>
            <input type="number" placeholder="e.g. 200000" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Max Price (£)</label>
            <input type="number" placeholder="e.g. 1000000" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Min Bedrooms</label>
            <input type="number" placeholder="e.g. 1" value={minBed} onChange={(e) => setMinBed(e.target.value)} />
          </div>
          <button className="search-btn" onClick={() => {}}>Apply</button>
          <button className="search-btn reset-btn" onClick={() => { setType('any'); setMinPrice(''); setMaxPrice(''); setMinBed(''); }}>Reset</button>
        </aside>
        <section className="results-area">
          <h2>{filtered.length} {filtered.length === 1 ? 'Property' : 'Properties'} in Feed</h2>
          {filtered.length === 0 ? (
            <div className="no-results" style={{ textAlign: 'center', padding: '3rem 1rem', background: '#f9f9f9', borderRadius: '8px', border: '1px dashed #ccc' }}>
              <span style={{ fontSize: '3rem' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.5" width="48" height="48">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="M21 21l-4.35-4.35"/>
                </svg>
              </span>
              <h3 style={{ margin: '1rem 0 0.5rem', color: '#333' }}>No Results Found</h3>
              <p style={{ color: '#666' }}>Try adjusting your filters to find more properties.</p>
            </div>
          ) : (
            <div className="results-grid results-grid--3">
              {filtered.map((p) => (
                <PropertyCard key={p.id} property={p} onAddFavourite={onAddFavourite} isFavourite={favourites.some((f) => f.id === p.id)} />
              ))}
            </div>
          )}
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <button className="feed__see-more-btn" onClick={() => navigate('/buy')}>See all listings</button>
          </div>
        </section>
      </div>
    </>
  );
}

export default FeedPage;
