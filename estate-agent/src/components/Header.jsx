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
              {label === 'Favourites' ? <><svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" style={{ verticalAlign: 'middle', marginRight: 2 }}><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg> </> : ''}{label}
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