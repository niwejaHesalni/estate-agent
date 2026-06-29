import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NAV_LINKS = [
  { label: 'Buy', to: '/buy' },
  { label: 'Rent', to: '/rent' },
  { label: 'Sell', to: '/sell' },
  { label: 'Feed', to: '/feed' },
  { label: 'Favourites', to: '/favourites' },
];

function Header({ favouritesCount = 0 }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
      <div className="header-inner">
        <Link to="/" className="header-logo">
          <img
            src="/images/img_7154.jpg"
            alt="EstateFind"
            className="logo-img"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          <span className="logo-fallback" style={{ display: 'none' }}>
            <span className="logo-icon">🏠</span>
            <span className="logo-text">EstateFind</span>
          </span>
        </Link>

        <nav className={`header-nav ${mobileOpen ? 'open' : ''}`}>
          {NAV_LINKS.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              className={`nav-link${pathname === to ? ' nav-link--active' : ''}${label === 'Favourites' ? ' nav-favourites' : ''}`}
              onClick={() => setMobileOpen(false)}
            >
              {label === 'Favourites' ? '♥ ' : ''}{label}
              {label === 'Favourites' && favouritesCount > 0 && (
                <span className="fav-badge">{favouritesCount}</span>
              )}
            </Link>
          ))}
        </nav>

        <button className="hamburger" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}

export default Header;