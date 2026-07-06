import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { imgPath } from '../utils/imgPath';

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
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 10);
      if (scrollY > 80) {
        if (scrollY > lastScrollY.current) {
          setHidden(true);
        } else {
          setHidden(false);
        }
      } else {
        setHidden(false);
      }
      lastScrollY.current = scrollY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('header-hidden', hidden);
  }, [hidden]);

  return (
    <header className={`site-header${scrolled ? ' scrolled' : ''}${hidden ? ' hidden' : ''}`}>
      <div className="header-inner">
        <Link to="/" className="header-logo">
          <img
            src={imgPath('/images/img_7155.png')}
            alt="EstateFind"
            className="logo-img"
          />
          <span className="logo-text">EstateFind</span>
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