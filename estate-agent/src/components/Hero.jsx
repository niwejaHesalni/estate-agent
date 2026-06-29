import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = ['Buy', 'Rent', 'Sell', 'Mortgage', 'My Home Value'];

const HERO_IMAGES = [
  '/images/pexels-eslames1-28406822.jpg',
  '/images/pexels-esteban-carriazo-2153373740-32983561.jpg',
  '/images/pexels-594476755-17143278.jpg',

];

function Hero({ title, subtitle, favouritesCount = 0 }) {
  const [activeTab, setActiveTab] = useState('Buy');
  const [query, setQuery] = useState('');
  const [currentImg, setCurrentImg] = useState(0);
  const navigate = useNavigate();

  /* Auto-cycle every 5 seconds */
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleSearch = () => {
    const tab = activeTab.toLowerCase();
    if (tab === 'buy') navigate(`/buy${query ? `?q=${encodeURIComponent(query)}` : ''}`);
    else if (tab === 'rent') navigate(`/rent${query ? `?q=${encodeURIComponent(query)}` : ''}`);
    else if (tab === 'sell') navigate('/sell');
    else if (tab === 'mortgage') navigate('/');
    else navigate('/');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  const placeholders = {
    'Buy': 'Enter a city, postcode or address',
    'Rent': 'Enter a city, postcode or area',
    'Sell': 'Enter your property address',
    'Mortgage': 'Enter property value',
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

        {/* Search bar */}
        <div className="hero-search">
          <input
            className="hero-search-input"
            type="text"
            placeholder={placeholders[activeTab]}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="hero-search-btn" onClick={handleSearch} aria-label="Search">
            🔍
          </button>
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