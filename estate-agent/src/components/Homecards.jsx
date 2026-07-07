import React from 'react';
import './Homecards.css';

const SERVICES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="32" height="32">
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/>
        <path d="M9 21V12h6v9"/>
      </svg>
    ),
    title: 'Find Your Dream Home',
    desc: 'Browse thousands of curated listings with virtual tours, detailed filters, and expert guidance to find the perfect property that matches your lifestyle and budget.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="32" height="32">
        <path d="M18 20V10"/>
        <path d="M12 20V4"/>
        <path d="M6 20v-6"/>
      </svg>
    ),
    title: 'Low Cost Home Taxes',
    desc: 'We help you navigate property tax assessments, identify exemptions and deductions, and ensure you never pay more than you owe on your home taxes.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32" style={{ color: '#b8860b' }}>
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
    title: 'Our Best Home Guarantee',
    desc: 'Every home we recommend comes with our satisfaction guarantee — backed by thorough inspections, transparent disclosures, and dedicated post-sale support.',
  },
];

function HomeCards() {
  return (
    <section className="home-cards">
      <div className="home-cards__container">
        <span className="home-cards__tag">-WHAT WE SERVE-</span>
        <h2 className="home-cards__heading">THE BENEFIT FROM OUR SERVICE</h2>

        <div className="home-cards__grid">
          {SERVICES.map((s, i) => (
            <div key={i} className="home-card">
              <div className="home-card__icon-wrap">
                {s.icon}
              </div>
              <h3 className="home-card__title">{s.title}</h3>
              <p className="home-card__desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HomeCards;
