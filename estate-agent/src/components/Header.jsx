import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NAV_LINKS = [
  { label: 'Buy',        to: '/buy' },
  { label: 'Rent',       to: '/rent' },
  { label: 'Sell',       to: '/sell' },
  { label: 'Mortgage',   to: '/mortgage' },
  { label: 'Feed',       to: '/feed' },
  { label: 'Favourites', to: '/favourites' },
];

function Header({ favouritesCount = 0 }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <header className="site-header">
      <div className="header-inner">
        {/* Logo */}
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

        {/* Nav */}
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

        <button className="btn-signin">Join / Sign in</button>

        <button className="hamburger" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}

export default Header;
