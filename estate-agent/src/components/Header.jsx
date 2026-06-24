import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

/**
 * Header - Redfin-style navbar with logo, nav links, and Join/Sign in button
 */
function Header({ favouritesCount = 0 }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-inner">
        {/* Logo */}
        <Link to="/" className="header-logo">
          <span className="logo-icon">🏠</span>
          <span className="logo-text">EstateFind</span>
        </Link>

        {/* Nav links */}
        <nav className={`header-nav ${mobileOpen ? 'open' : ''}`}>
          <Link to="/?tab=buy" className="nav-link" onClick={() => setMobileOpen(false)}>Buy</Link>
          <Link to="/?tab=rent" className="nav-link" onClick={() => setMobileOpen(false)}>Rent</Link>
          <Link to="/?tab=sell" className="nav-link" onClick={() => setMobileOpen(false)}>Sell</Link>
          <Link to="/?tab=mortgage" className="nav-link" onClick={() => setMobileOpen(false)}>Mortgage</Link>
          <Link to="/?tab=feed" className="nav-link" onClick={() => setMobileOpen(false)}>Feed</Link>
          <Link to="/?tab=favourites" className="nav-link nav-favourites" onClick={() => setMobileOpen(false)}>
            ♥ Favourites {favouritesCount > 0 && <span className="fav-badge">{favouritesCount}</span>}
          </Link>
        </nav>

        {/* CTA */}
        <button className="btn-signin">Join / Sign in</button>

        {/* Hamburger */}
        <button className="hamburger" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}

export default Header;
