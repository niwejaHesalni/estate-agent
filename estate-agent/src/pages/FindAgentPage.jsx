import React, { useState } from 'react';
import Hero from '../components/Hero';

function initials(name) {
  return name.split(' ').map((w) => w[0]).join('');
}

const AGENTS = [
  { id: 'a1', name: 'Sarah Mitchell', area: 'London & South East', specialty: 'Residential Sales', rating: 4.9, reviews: 142, phone: '020 7946 0123', email: 'sarah@estatefind.co.uk' },
  { id: 'a2', name: 'James Thornton', area: 'Manchester & North West', specialty: 'Buy to Let', rating: 4.8, reviews: 98, phone: '0161 496 0456', email: 'james@estatefind.co.uk' },
  { id: 'a3', name: 'Priya Kapoor', area: 'Birmingham & Midlands', specialty: 'First Time Buyers', rating: 4.9, reviews: 211, phone: '0121 496 0789', email: 'priya@estatefind.co.uk' },
  { id: 'a4', name: 'Tom Edwards', area: 'Bristol & South West', specialty: 'Luxury Homes', rating: 4.7, reviews: 76, phone: '0117 496 0321', email: 'tom@estatefind.co.uk' },
  { id: 'a5', name: 'Claire Watson', area: 'Edinburgh & Scotland', specialty: 'Residential Sales', rating: 4.8, reviews: 133, phone: '0131 496 0654', email: 'claire@estatefind.co.uk' },
  { id: 'a6', name: 'David Patel', area: 'Leeds & Yorkshire', specialty: 'Investment Properties', rating: 4.6, reviews: 89, phone: '0113 496 0987', email: 'david@estatefind.co.uk' },
];

const AREAS = ['All Areas', 'London & South East', 'Manchester & North West', 'Birmingham & Midlands', 'Bristol & South West', 'Edinburgh & Scotland', 'Leeds & Yorkshire'];
const SPECIALTIES = ['Any Specialty', 'Residential Sales', 'Buy to Let', 'First Time Buyers', 'Luxury Homes', 'Investment Properties'];

function FindAgentPage() {
  const [area, setArea] = useState('All Areas');
  const [specialty, setSpecialty] = useState('Any Specialty');
  const [contacted, setContacted] = useState({});

  const filtered = AGENTS.filter((a) => {
    if (area !== 'All Areas' && a.area !== area) return false;
    if (specialty !== 'Any Specialty' && a.specialty !== specialty) return false;
    return true;
  });

  return (
    <>
      <Hero title="Find an Agent" subtitle="Connect with experienced local agents across the UK." />
      <div className="page-layout">
        <aside className="filter-panel">
          <h3>Filter Agents</h3>
          <div className="form-group">
            <label>Area</label>
            <select value={area} onChange={(e) => setArea(e.target.value)}>
              {AREAS.map((a) => <option key={a}>{a}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Specialty</label>
            <select value={specialty} onChange={(e) => setSpecialty(e.target.value)}>
              {SPECIALTIES.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
          <button className="search-btn reset-btn" onClick={() => { setArea('All Areas'); setSpecialty('Any Specialty'); }}>Reset</button>
        </aside>

        <section className="results-area">
          <h2>{filtered.length} {filtered.length === 1 ? 'Agent' : 'Agents'} Found</h2>
          <div className="agent-grid">
            {filtered.map((agent) => (
              <div key={agent.id} className="agent-card">
                <div className="agent-card__avatar">{initials(agent.name)}</div>
                <div className="agent-card__info">
                  <h3>{agent.name}</h3>
                  <div className="agent-card__area">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14" style={{ verticalAlign: 'middle', marginRight: 3 }}>
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                    {agent.area}
                  </div>
                  <div className="agent-card__spec">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14" style={{ verticalAlign: 'middle', marginRight: 3 }}>
                      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/>
                      <path d="M9 21V12h6v9"/>
                    </svg>
                    {agent.specialty}
                  </div>
                  <div className="agent-card__rating">
                    {Array.from({ length: 5 }, (_, i) => i < Math.round(agent.rating)).map((filled, i) => (
                      <svg key={i} viewBox="0 0 24 24" width="14" height="14" style={{ verticalAlign: 'middle' }}>
                        {filled
                          ? <path fill="currentColor" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          : <path fill="none" stroke="currentColor" strokeWidth="2" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        }
                      </svg>
                    ))}
                    <span> {agent.rating} ({agent.reviews} reviews)</span>
                  </div>
                </div>
                <div className="agent-card__actions">
                  <a href={`tel:${agent.phone}`} className="agent-card__btn agent-card__btn--call">Call</a>
                  <button
                    className={`agent-card__btn agent-card__btn--contact${contacted[agent.id] ? ' sent' : ''}`}
                    onClick={() => setContacted((prev) => ({ ...prev, [agent.id]: true }))}
                  >
                    {contacted[agent.id] ? 'Sent!' : 'Contact'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

export default FindAgentPage;
