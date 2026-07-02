import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import properties from '../data/properties';
import { encodeUrlParam } from '../utils/sanitize';

const HERO_IMAGES = [
  '/images/pexels-eslames1-28406822.jpg',
  '/images/pexels-esteban-carriazo-2153373740-32983561.jpg',
  '/images/pexels-594476755-17143278.jpg',
];

const TABS = ['Buy', 'Rent', 'Sell', 'My Home Value'];

function Hero({ title, subtitle, favouritesCount = 0 }) {
  const [activeTab, setActiveTab] = useState('Buy');
  const [query, setQuery] = useState('');
  const [currentImg, setCurrentImg] = useState(0);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const searchContainerRef = useRef(null);

  const navigate = useNavigate();

  /* Auto-cycle every 5 seconds */
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  /* Filter suggestions from local properties data */
  useEffect(() => {
    if (!query || query.trim().length < 2 || !showSuggestions) {
      setSuggestions([]);
      return;
    }

    const isRent = activeTab.toLowerCase() === 'rent';
    const isBuy = activeTab.toLowerCase() === 'buy';

    const tabFilteredProperties = properties.filter((p) => {
      if (isRent) return p.tenure === 'Leasehold';
      if (isBuy) return p.tenure === 'Freehold' || p.type === 'House' || p.type === 'Flat';
      return true;
    });

    const matched = tabFilteredProperties.filter((p) =>
      p.location.toLowerCase().includes(query.toLowerCase())
    );

    // Limit to 5 suggestions
    setSuggestions(matched.slice(0, 5));
  }, [query, showSuggestions, activeTab]);

  /* Reset active suggestion highlight when suggestions update */
  useEffect(() => {
    setActiveSuggestionIndex(-1);
  }, [suggestions]);

  /* Close dropdown when clicking outside */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectSuggestion = (property) => {
    setQuery(property.location);
    setSuggestions([]);
    setShowSuggestions(false);
    
    // Navigate directly to the property's detailed page
    navigate(`/property/${property.id}`);
  };

  const handleSearch = () => {
    const tab = activeTab.toLowerCase();
    if (tab === 'buy') navigate(`/buy${query ? `?q=${encodeUrlParam(query)}` : ''}`);
    else if (tab === 'rent') navigate(`/rent${query ? `?q=${encodeUrlParam(query)}` : ''}`);
    else if (tab === 'sell') navigate('/sell');
    else navigate('/');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (activeSuggestionIndex >= 0 && activeSuggestionIndex < suggestions.length) {
        e.preventDefault();
        handleSelectSuggestion(suggestions[activeSuggestionIndex]);
      } else {
        handleSearch();
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveSuggestionIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveSuggestionIndex((prev) =>
        prev > 0 ? prev - 1 : suggestions.length - 1
      );
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const placeholders = {
    'Buy': 'Enter a city, postcode or address',
    'Rent': 'Enter a city, postcode or area',
    'Sell': 'Enter your property address',
    'My Home Value': 'Enter your street address',
  };

  return (
    <section className="hero">
      {/* Slideshow layers — one per image, crossfade via opacity */}
      {HERO_IMAGES.map((src, i) => (
        <div
          key={src}
          className="hero-slide"
          style={{
            backgroundImage: `url(${src})`,
            opacity: i === currentImg ? 1 : 0,
          }}
          aria-hidden={i !== currentImg}
        />
      ))}

      <div className="hero-overlay" />

      <div className="hero-content">
        <h1 className="hero-headline">
          {title || 'Find your perfect\nhome today'}
        </h1>
        {subtitle && <p className="hero-subtitle">{subtitle}</p>}

        {/* Tabs */}
        <div className="hero-tabs">
          {TABS.map((tab) => (
            <button
              key={tab}
              className={`hero-tab${activeTab === tab ? ' active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
              {tab === 'Buy' && favouritesCount > 0 && (
                <span className="hero-fav-badge">{favouritesCount}</span>
              )}
            </button>
          ))}
        </div>

        {/* Search bar inside wrapper */}
        <div className="hero-search-wrapper" ref={searchContainerRef}>
          <div className="hero-search">
            <input
              className="hero-search-input"
              type="text"
              placeholder={placeholders[activeTab]}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onKeyDown={handleKeyDown}
            />
            <button className="hero-search-btn" onClick={handleSearch} aria-label="Search">
              🔍
            </button>
          </div>

          {/* Suggestions List */}
          {showSuggestions && (query.trim().length >= 2) && (
            <div className="hero-search-suggestions">
              {suggestions.length === 0 && (
                <div className="hero-search-suggestions-loading">No locations found</div>
              )}
              {suggestions.map((property, i) => (
                <button
                  key={property.id}
                  className={`hero-search-suggestion-item${i === activeSuggestionIndex ? ' active' : ''}`}
                  onClick={() => handleSelectSuggestion(property)}
                  onMouseEnter={() => setActiveSuggestionIndex(i)}
                >
                  <span className="suggestion-icon">📍</span>
                  <span>{property.location}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Slide dots */}
        <div className="hero-dots" role="tablist" aria-label="Hero slides">
          {HERO_IMAGES.map((_, i) => (
            <button
              key={i}
              className={`hero-dot${i === currentImg ? ' active' : ''}`}
              onClick={() => setCurrentImg(i)}
              aria-label={`Slide ${i + 1}`}
              role="tab"
              aria-selected={i === currentImg}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;