import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Hero from '../components/Hero';
import PropertyCard from '../components/PropertyCard';
import FavouritesSidebar from '../components/FavouritesSidebar';
import properties from '../data/properties';

function BuyPage({ favourites, onAddFavourite, onRemoveFavourite, onClear }) {
  const buyProps = properties.filter((p) => p.tenure === 'Freehold' || p.type === 'House' || p.type === 'Flat');
  const [searchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minBed, setMinBed] = useState('');
  const [type, setType] = useState('any');

  const filtered = buyProps.filter((p) => {
    if (type !== 'any' && p.type !== type) return false;
    if (minPrice && p.price < Number(minPrice)) return false;
    if (maxPrice && p.price > Number(maxPrice)) return false;
    if (minBed && p.bedrooms < Number(minBed)) return false;
    if (queryParam && !p.location.toLowerCase().includes(queryParam.toLowerCase())) return false;
    return true;
  });

  return (
    <>
      <Hero title={"Find your perfect home"} subtitle="Browse properties available to buy across the UK." />
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
            <input type="number" placeholder="e.g. 2" value={minBed} onChange={(e) => setMinBed(e.target.value)} />
          </div>
          <button className="search-btn" onClick={() => {}}>Apply</button>
          <button className="search-btn reset-btn" onClick={() => { setType('any'); setMinPrice(''); setMaxPrice(''); setMinBed(''); }}>Reset</button>
        </aside>
        <section className="results-area">
          <h2>{filtered.length} {filtered.length === 1 ? 'Property' : 'Properties'} to Buy</h2>
          {filtered.length === 0 ? (
            <div className="no-results" style={{ textAlign: 'center', padding: '3rem 1rem', background: '#f9f9f9', borderRadius: '8px', border: '1px dashed #ccc' }}>
              <span style={{ fontSize: '3rem' }}>🔍</span>
              <h3 style={{ margin: '1rem 0 0.5rem', color: '#333' }}>No Results Found</h3>
              <p style={{ color: '#666' }}>We couldn't find any properties matching "{queryParam}". Try checking the location spelling or adjusting filters.</p>
            </div>
          ) : (
            <div className="results-grid">
              {filtered.map((p) => (
                <PropertyCard key={p.id} property={p} onAddFavourite={onAddFavourite} isFavourite={favourites.some((f) => f.id === p.id)} />
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
}

export default BuyPage;
