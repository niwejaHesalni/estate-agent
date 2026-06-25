import React, { useState } from 'react';
import Hero from '../components/Hero';
import PropertyCard from '../components/PropertyCard';
import properties from '../data/properties';

function RentPage({ favourites, onAddFavourite }) {
  const rentProps = properties.filter((p) => p.tenure === 'Leasehold');
  const [minBed, setMinBed] = useState('');
  const [type, setType] = useState('any');

  const filtered = rentProps.filter((p) => {
    if (type !== 'any' && p.type !== type) return false;
    if (minBed && p.bedrooms < Number(minBed)) return false;
    return true;
  });

  return (
    <>
      <Hero title={"Rent your next home"} subtitle="Flats, houses and apartments available to rent near you." />
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
            <label>Min Bedrooms</label>
            <input type="number" placeholder="e.g. 1" value={minBed} onChange={(e) => setMinBed(e.target.value)} />
          </div>
          <button className="search-btn reset-btn" onClick={() => { setType('any'); setMinBed(''); }}>Reset</button>
        </aside>
        <section className="results-area">
          <h2>{filtered.length} {filtered.length === 1 ? 'Property' : 'Properties'} to Rent</h2>
          {filtered.length === 0 ? (
            <div className="no-results"><p>No rental properties match your filters.</p></div>
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

export default RentPage;