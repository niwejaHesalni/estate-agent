import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import properties from '../data/properties';
import LocationMap from '../components/LocationMap';
import './PropertyPage.css';

function PropertyPage({ favourites, onAddFavourite }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const property = properties.find((p) => p.id === id);
  const [activeImg, setActiveImg] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ first: '', last: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  React.useEffect(() => { window.scrollTo(0, 0); }, []);

  const openLightbox = (i) => { setActiveImg(i); setLightboxOpen(true); };
  const closeLightbox = () => setLightboxOpen(false);
  const prevImg = () => setActiveImg((p) => (p > 0 ? p - 1 : property.pictures.length - 1));
  const nextImg = () => setActiveImg((p) => (p < property.pictures.length - 1 ? p + 1 : 0));

  React.useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevImg();
      if (e.key === 'ArrowRight') nextImg();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxOpen]);

  if (!property) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem' }}>
        <p>Property not found.</p>
        <button onClick={() => navigate(-1)}>← Back</button>
      </div>
    );
  }

  const isFavourite = favourites.some((f) => f.id === property.id);

  const fmt = (p) =>
    p.toLocaleString('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 });

  // Derived stats from existing data
  const sqft = property.bedrooms * 420 + 300; // estimated
  const estMonthly = Math.round((property.price * 0.045) / 12);
  const pricePerSqft = Math.round(property.price / sqft);

  function StatIcon({ d }) {
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20"><path d={d} /></svg>;
  }

  const stats = [
    { icon: <StatIcon d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5zM9 21V12h6v9" />, label: 'Property Type', value: property.type },
    { icon: <StatIcon d="M19 4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zM16 2v4M8 2v4M3 10h18" />, label: 'Year Added', value: `${property.added.day} ${property.added.month} ${property.added.year}` },
    { icon: <StatIcon d="M4 20h16M4 4h16v16H4zM9 4v16M15 4v16" />, label: 'Est. Size', value: `${sqft.toLocaleString()} sq ft` },
    { icon: <StatIcon d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />, label: 'Price/Sq.Ft.', value: `£${pricePerSqft}` },
    { icon: <StatIcon d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM6 2v4M18 2v4M8 13h2M14 13h2M8 17h2M14 17h2" />, label: 'Tenure', value: property.tenure },
    { icon: <StatIcon d="M3 7v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7M3 7l9-5 9 5M9 21V12h6v9" />, label: 'Bedrooms', value: property.bedrooms },
  ];

  const handleSubmit = () => {
    if (contactForm.first && contactForm.email) setSubmitted(true);
  };

  return (
    <div className="pp">
      {/* ── Top nav bar ── */}
      <div className="pp__topbar">
        <button className="pp__back" onClick={() => navigate(-1)}>Search</button>
        <nav className="pp__tabnav">
          <a href="#overview" className="pp__tabnav-link pp__tabnav-link--active">Overview</a>
          <a href="#neighborhood" className="pp__tabnav-link">Neighbourhood</a>
          <a href="#details" className="pp__tabnav-link">Property details</a>
        </nav>
        <div className="pp__topbar-actions">
          <button
            className={`pp__action-btn${isFavourite ? ' pp__action-btn--active' : ''}`}
            onClick={() => onAddFavourite(property)}
          >
            {isFavourite ? (
              <><svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" style={{ verticalAlign: 'middle', marginRight: 3 }}><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg> Saved</>
            ) : (
              <><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14" style={{ verticalAlign: 'middle', marginRight: 3 }}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg> Favourite</>
            )}
          </button>
          <button className="pp__action-btn">Share</button>
        </div>
      </div>

      {/* ── Main two-col layout ── */}
      <div className="pp__body">

        {/* ── LEFT COLUMN ── */}
        <div className="pp__left">

          {/* Image gallery */}
          <div className="pp__gallery">
            <div className="pp__gallery-main" onClick={() => openLightbox(activeImg)} style={{ cursor: 'pointer' }}>
              <img
                src={property.pictures[activeImg]}
                alt={`Property ${activeImg + 1}`}
                onError={(e) => { e.target.src = `https://placehold.co/800x480?text=Image+${activeImg + 1}`; }}
              />
            </div>
            <div className="pp__gallery-thumbs">
              {property.pictures.map((pic, i) => (
                <img
                  key={i}
                  src={pic}
                  alt={`Thumb ${i + 1}`}
                  className={i === activeImg ? 'active' : ''}
                  onClick={() => openLightbox(i)}
                  onError={(e) => { e.target.src = `https://placehold.co/100x70?text=${i + 1}`; }}
                />
              ))}
            </div>
          </div>

          {/* Lightbox */}
          {lightboxOpen && (
            <div className="pp-lightbox" onClick={closeLightbox}>
              <button className="pp-lightbox__close" onClick={closeLightbox}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
              <button className="pp-lightbox__arrow pp-lightbox__arrow--left" onClick={(e) => { e.stopPropagation(); prevImg(); }}>‹</button>
              <div className="pp-lightbox__image-wrap" onClick={(e) => e.stopPropagation()}>
                <img src={property.pictures[activeImg]} alt={`Property ${activeImg + 1}`} />
              </div>
              <button className="pp-lightbox__arrow pp-lightbox__arrow--right" onClick={(e) => { e.stopPropagation(); nextImg(); }}>›</button>
              <div className="pp-lightbox__thumbs" onClick={(e) => e.stopPropagation()}>
                {property.pictures.map((pic, i) => (
                  <img
                    key={i}
                    src={pic}
                    alt={`Thumb ${i + 1}`}
                    className={i === activeImg ? 'active' : ''}
                    onClick={() => setActiveImg(i)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* ── Overview section ── */}
          <div id="overview" className="pp__card">
            <div className="pp__overview-top">
              <div>
                <span className="pp__badge pp__badge--green">● AVAILABLE</span>
                <div className="pp__price-row">
                  <span className="pp__price">{fmt(property.price)}</span>
                  <span className="pp__est">Est. £{estMonthly.toLocaleString()}/mo</span>
                </div>
                <p className="pp__specs">
                  {property.bedrooms} bd &nbsp;·&nbsp; {Math.ceil(property.bedrooms * 0.75)} ba &nbsp;·&nbsp; {sqft.toLocaleString()} sq ft
                </p>
                <p className="pp__address">{property.location}</p>
              </div>
              {/* Mini map thumbnail */}
              <div className="pp__mini-map">
                <LocationMap
                  locations={[property.location]}
                  height="90px"
                  mini={true}
                  zoom={14}
                />
              </div>
            </div>

            {/* Early access banner */}
            <div className="pp__early-access">
              <span className="pp__ea-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </span>
              <div>
                <strong>Early Access</strong>
                <p>You're getting a sneak peek at this home before it's listed on other search sites.</p>
              </div>
            </div>
          </div>

          {/* ── About this home ── */}
          <div id="details" className="pp__card">
            <h2 className="pp__section-title">About this home</h2>
            <p className="pp__presented-by">Presented by <strong>EstateFind Agent</strong> | EstateFind</p>
            <p className="pp__description">{property.description}</p>

            {/* Stats grid */}
            <div className="pp__stats-grid">
              {stats.map((s) => (
                <div key={s.label} className="pp__stat">
                  <span className="pp__stat-icon">{s.icon}</span>
                  <div>
                    <div className="pp__stat-value">{s.value}</div>
                    <div className="pp__stat-label">{s.label}</div>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* ── Tabs: Floor Plan / Map ── */}
          <div id="neighborhood" className="pp__card">
            <Tabs>
              <TabList>
                <Tab>Floor Plan</Tab>
                <Tab>Map</Tab>
              </TabList>
              <TabPanel>
                <img
                  src={property.floorplan}
                  alt="Floor plan"
                  style={{ maxHeight: 400, margin: '1rem auto', display: 'block' }}
                  onError={(e) => { e.target.src = 'https://placehold.co/600x400?text=Floor+Plan'; }}
                />
              </TabPanel>
              <TabPanel>
                <div className="pp__map-wrap">
                  <p className="pp__map-label">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14" style={{ verticalAlign: 'middle', marginRight: 3 }}>
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                    {property.location}
                  </p>
                  <LocationMap
                    locations={[property.location]}
                    height="340px"
                    zoom={15}
                  />
                </div>
              </TabPanel>
            </Tabs>
          </div>

        </div>{/* end left */}

        {/* ── RIGHT COLUMN — Contact sidebar ── */}
        <aside className="pp__sidebar">
          <div className="pp__contact-card">
            <h3 className="pp__contact-title">Early access</h3>
            <p className="pp__contact-sub">
              This home is available for early access. Contact an agent to learn more or schedule a tour.
            </p>

            <div className="pp__agent-info">
              <div className="pp__agent-avatar pp__agent-avatar--lg">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <div>
                <div className="pp__agent-role">Listing agent</div>
                <div className="pp__agent-name">EstateFind Agent</div>
              </div>
            </div>

            {submitted ? (
              <div className="pp__submitted">
                <p>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16" style={{ verticalAlign: 'middle', marginRight: 4 }}>
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                  Thanks! An agent will be in touch shortly.
                </p>
              </div>
            ) : (
              <div className="pp__form">
                <div className="pp__form-row">
                </div>
                <div className="pp__form-group">
                  <label>Message</label>
                  <textarea
                    rows={3}
                    placeholder={`I would like more information about ${property.location}...`}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  />
                </div>
                <button className="pp__contact-btn" onClick={handleSubmit}>Contact agent</button>
              </div>
            )}
          </div>
        </aside>

      </div>{/* end body */}
    </div>
  );
}

export default PropertyPage;
