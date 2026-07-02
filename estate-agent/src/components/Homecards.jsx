import React from 'react';
import './Homecards.css';

const SERVICES = [
  {
    icon: '🏡',
    title: 'Find Your Dream Home',
    desc: 'Browse thousands of curated listings with virtual tours, detailed filters, and expert guidance to find the perfect property that matches your lifestyle and budget.',
  },
  {
    icon: '📊',
    title: 'Low Cost Home Taxes',
    desc: 'We help you navigate property tax assessments, identify exemptions and deductions, and ensure you never pay more than you owe on your home taxes.',
  },
  {
    icon: '⭐',
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
                <span className="home-card__icon">{s.icon}</span>
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
