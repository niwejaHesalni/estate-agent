import React, { useState } from 'react';
import Hero from '../components/Hero';

const AGENTS = [
  { id: 'a1', name: 'Sarah Mitchell', area: 'London & South East', specialty: 'Residential Sales', rating: 4.9, reviews: 142, phone: '020 7946 0123', email: 'sarah@estatefind.co.uk', avatar: '👩‍💼' },
  { id: 'a2', name: 'James Thornton', area: 'Manchester & North West', specialty: 'Buy to Let', rating: 4.8, reviews: 98, phone: '0161 496 0456', email: 'james@estatefind.co.uk', avatar: '👨‍💼' },
  { id: 'a3', name: 'Priya Kapoor', area: 'Birmingham & Midlands', specialty: 'First Time Buyers', rating: 4.9, reviews: 211, phone: '0121 496 0789', email: 'priya@estatefind.co.uk', avatar: '👩‍💼' },
  { id: 'a4', name: 'Tom Edwards', area: 'Bristol & South West', specialty: 'Luxury Homes', rating: 4.7, reviews: 76, phone: '0117 496 0321', email: 'tom@estatefind.co.uk', avatar: '👨‍💼' },
  { id: 'a5', name: 'Claire Watson', area: 'Edinburgh & Scotland', specialty: 'Residential Sales', rating: 4.8, reviews: 133, phone: '0131 496 0654', email: 'claire@estatefind.co.uk', avatar: '👩‍💼' },
  { id: 'a6', name: 'David Patel', area: 'Leeds & Yorkshire', specialty: 'Investment Properties', rating: 4.6, reviews: 89, phone: '0113 496 0987', email: 'david@estatefind.co.uk', avatar: '👨‍💼' },
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
                <div className="agent-card__avatar">{agent.avatar}</div>
                <div className="agent-card__info">
                  <h3>{agent.name}</h3>
                  <div className="agent-card__area">📍 {agent.area}</div>
                  <div className="agent-card__spec">🏠 {agent.specialty}</div>
                  <div className="agent-card__rating">
                    {'★'.repeat(Math.round(agent.rating))}{'☆'.repeat(5 - Math.round(agent.rating))}
                    <span> {agent.rating} ({agent.reviews} reviews)</span>
                  </div>
                </div>
                <div className="agent-card__actions">
                  <a href={`tel:${agent.phone}`} className="agent-card__btn agent-card__btn--call">📞 Call</a>
                  <button
                    className={`agent-card__btn agent-card__btn--contact${contacted[agent.id] ? ' sent' : ''}`}
                    onClick={() => setContacted((prev) => ({ ...prev, [agent.id]: true }))}
                  >
                    {contacted[agent.id] ? '✓ Sent!' : '✉ Contact'}
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
