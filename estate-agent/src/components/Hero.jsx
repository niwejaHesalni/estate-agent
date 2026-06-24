import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = ['Buy', 'Rent', 'Mortgage', 'Sell', 'Feed', 'Favourites'];

/**
 * Hero - Full-width hero section with city skyline background,
 * headline, tab switcher, and search bar — Redfin-style.
 */
function Hero({ activeTab, onTabChange, onSearch, favouritesCount = 0 }) {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (onSearch) onSearch(query, activeTab);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  const placeholders = {
    Buy: 'Enter city, postcode or address to buy...',
    Rent: 'Enter city, postcode or address to rent...',
    Mortgage: 'Enter property value to estimate mortgage...',
    Sell: 'Enter your property address to get an estimate...',
    Feed: 'Search latest listings and news...',
    Favourites: 'Search your saved properties...',
  };

  return (
    <section className="hero">
      <div className="hero-overlay" />
      <div className="hero-content">
        <h1 className="hero-headline">
          Claim your home<br />and get a free estimate
        </h1>

        {/* Tab switcher */}
        <div className="hero-tabs">
          {TABS.map((tab) => (
            <button
              key={tab}
              className={`hero-tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => onTabChange(tab)}
            >
              {tab}
              {tab === 'Favourites' && favouritesCount > 0 && (
                <span className="hero-fav-badge">{favouritesCount}</span>
              )}
            </button>
          ))}
        </div>

        {/* Search bar */}
        <div className="hero-search">
          <input
            type="text"
            className="hero-search-input"
            placeholder={placeholders[activeTab] || 'Enter your street address'}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKey}
          />
          <button className="hero-search-btn" onClick={handleSearch} aria-label="Search">
            🔍
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
