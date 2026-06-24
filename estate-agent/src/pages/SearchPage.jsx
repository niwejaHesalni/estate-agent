import React, { useState } from 'react';
import PropertyCard from '../components/PropertyCard';
import FavouritesSidebar from '../components/FavouritesSidebar';
import properties from '../data/properties';

/**
 * SearchPage - Main page with search form, results grid, and favourites sidebar.
 */
function SearchPage({ favourites, onAddFavourite, onRemoveFavourite, onClearFavourites, activeTab, heroQuery }) {
  // --- Search form state ---
  const [type, setType] = useState('any');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minBedrooms, setMinBedrooms] = useState('');
  const [maxBedrooms, setMaxBedrooms] = useState('');
  const [dateAfter, setDateAfter] = useState('');
  const [postcode, setPostcode] = useState('');
  const [results, setResults] = useState(properties); // show all by default

  /**
   * Converts property's added object to a JS Date for comparison.
   */
  const propDate = (p) =>
    new Date(`${p.added.month} ${p.added.day}, ${p.added.year}`);

  /**
   * handleSearch - Filters properties against current form values.
   * All criteria are optional and combined (AND logic).
   */
  const handleSearch = () => {
    let filtered = [...properties];

    if (type !== 'any') {
      filtered = filtered.filter((p) => p.type === type);
    }
    if (minPrice !== '') {
      filtered = filtered.filter((p) => p.price >= Number(minPrice));
    }
    if (maxPrice !== '') {
      filtered = filtered.filter((p) => p.price <= Number(maxPrice));
    }
    if (minBedrooms !== '') {
      filtered = filtered.filter((p) => p.bedrooms >= Number(minBedrooms));
    }
    if (maxBedrooms !== '') {
      filtered = filtered.filter((p) => p.bedrooms <= Number(maxBedrooms));
    }
    if (dateAfter !== '') {
      const after = new Date(dateAfter);
      filtered = filtered.filter((p) => propDate(p) >= after);
    }
    if (postcode.trim() !== '') {
      const pc = postcode.trim().toUpperCase();
      filtered = filtered.filter((p) =>
        p.location.toUpperCase().includes(pc)
      );
    }

    setResults(filtered);
  };

  const handleReset = () => {
    setType('any');
    setMinPrice('');
    setMaxPrice('');
    setMinBedrooms('');
    setMaxBedrooms('');
    setDateAfter('');
    setPostcode('');
    setResults(properties);
  };

  return (
    <main className="search-layout">
      {/* ---- Search Form ---- */}
      <section className="search-form">
        <h2>Search Properties</h2>

        <div className="form-group">
          <label htmlFor="type">Property Type</label>
          <select id="type" value={type} onChange={(e) => setType(e.target.value)}>
            <option value="any">Any</option>
            <option value="House">House</option>
            <option value="Flat">Flat</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="minPrice">Min Price (£)</label>
          <input
            id="minPrice"
            type="number"
            placeholder="e.g. 200000"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            min="0"
          />
        </div>

        <div className="form-group">
          <label htmlFor="maxPrice">Max Price (£)</label>
          <input
            id="maxPrice"
            type="number"
            placeholder="e.g. 900000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            min="0"
          />
        </div>

        <div className="form-group">
          <label htmlFor="minBed">Min Bedrooms</label>
          <input
            id="minBed"
            type="number"
            placeholder="e.g. 2"
            value={minBedrooms}
            onChange={(e) => setMinBedrooms(e.target.value)}
            min="0"
          />
        </div>

        <div className="form-group">
          <label htmlFor="maxBed">Max Bedrooms</label>
          <input
            id="maxBed"
            type="number"
            placeholder="e.g. 4"
            value={maxBedrooms}
            onChange={(e) => setMaxBedrooms(e.target.value)}
            min="0"
          />
        </div>

        <div className="form-group">
          <label htmlFor="dateAfter">Added After</label>
          <input
            id="dateAfter"
            type="date"
            value={dateAfter}
            onChange={(e) => setDateAfter(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="postcode">Postcode Area (e.g. BR1)</label>
          <input
            id="postcode"
            type="text"
            placeholder="e.g. BR1"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
          />
        </div>

        <button className="search-btn" onClick={handleSearch}>Search</button>
        <button
          className="search-btn"
          onClick={handleReset}
          style={{ marginTop: '0.5rem', background: '#6b7280' }}
        >
          Reset
        </button>
      </section>

      {/* ---- Results ---- */}
      <section className="results-area">
        <h2>{results.length} {results.length === 1 ? 'Property' : 'Properties'} Found</h2>
        {results.length === 0 ? (
          <div className="no-results">
            <p>No properties match your criteria.</p>
            <p>Try adjusting your search filters.</p>
          </div>
        ) : (
          <div className="results-grid">
            {results.map((p) => (
              <PropertyCard
                key={p.id}
                property={p}
                onAddFavourite={onAddFavourite}
                isFavourite={favourites.some((f) => f.id === p.id)}
              />
            ))}
          </div>
        )}
      </section>

      {/* ---- Favourites Sidebar ---- */}
      <FavouritesSidebar
        favourites={favourites}
        allProperties={properties}
        onAddFavourite={onAddFavourite}
        onRemoveFavourite={onRemoveFavourite}
        onClear={onClearFavourites}
      />
    </main>
  );
}

export default SearchPage;
