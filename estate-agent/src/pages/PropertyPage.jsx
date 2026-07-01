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
  const [contactForm, setContactForm] = useState({ first: '', last: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

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

  const encode = (str) =>
    String(str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  // Derived stats from existing data
  const sqft = property.bedrooms * 420 + 300; // estimated
  const estMonthly = Math.round((property.price * 0.045) / 12);
  const pricePerSqft = Math.round(property.price / sqft);

  const stats = [
    { icon: '🏠', label: 'Property Type', value: property.type },
    { icon: '📅', label: 'Year Added', value: `${property.added.day} ${property.added.month} ${property.added.year}` },
    { icon: '📐', label: 'Est. Size', value: `${sqft.toLocaleString()} sq ft` },
    { icon: '💷', label: 'Price/Sq.Ft.', value: `£${pricePerSqft}` },
    { icon: '📋', label: 'Tenure', value: property.tenure },
    { icon: '🛏️', label: 'Bedrooms', value: property.bedrooms },
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
            {isFavourite ? '♥ Saved' : '♡ Favourite'}
          </button>
          <button className="pp__action-btn">🔔 Hide</button>
          <button className="pp__action-btn">⤴ Share</button>
        </div>
      </div>

      {/* ── Main two-col layout ── */}
      <div className="pp__body">

        {/* ── LEFT COLUMN ── */}
        <div className="pp__left">

          {/* Image gallery */}
          <div className="pp__gallery">
            <div className="pp__gallery-main">
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
                  onClick={() => setActiveImg(i)}
                  onError={(e) => { e.target.src = `https://placehold.co/100x70?text=${i + 1}`; }}
                />
              ))}
            </div>
          </div>

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
              <span className="pp__ea-icon">💎</span>
              <div>
                <strong>Early Access</strong>
                <p>You're getting a sneak peek at this home before it's listed on other search sites.</p>
              </div>
            </div>
          </div>

          {/* ── About this home ── */}
          <div id="details" className="pp__card">
            <h2 className="pp__section-title">About this home</h2>
            <p className="pp__presented-by">Presented by <strong>EstateFind Agent</strong> | 🏠 EstateFind</p>
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
                  <p className="pp__map-label">📍 {property.location}</p>
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
              <div className="pp__agent-avatar pp__agent-avatar--lg">👤</div>
              <div>
                <div className="pp__agent-role">Listing agent</div>
                <div className="pp__agent-name">EstateFind Agent</div>
              </div>
            </div>

            {submitted ? (
              <div className="pp__submitted">
                <p>✅ Thanks! An agent will be in touch shortly.</p>
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
