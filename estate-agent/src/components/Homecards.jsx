import React from 'react';
import './HomeCards.css';

const CARDS = [
  {
    icon: '👩‍💼',
    title: 'Buy',
    desc: 'Our agents are among the most experienced in the industry and can help you win in today\'s market.',
    cta: 'Find an agent',
  },
  {
    icon: '🏦',
    title: 'Mortgage',
    desc: 'Get award-winning service with competitive rates, fast pre-approvals, and seamless closings.',
    cta: 'Get prequalified',
  },
  {
    icon: '💰',
    title: 'Sell',
    desc: 'We know how to price, market, and sell your home for top dollar — all for half the listing fee others charge.',
    cta: 'Learn more',
  },
  {
    icon: '🏠',
    title: 'Rent',
    desc: 'Whether you\'re searching for apartments, condos, or rental homes, we make it easy to find a place you\'ll love.',
    cta: 'Explore rentals',
  },
];

function HomeCards() {
  return (
    <section className="home-cards">
      <div className="home-cards__grid">
        {CARDS.map((c) => (
          <div key={c.title} className="home-card">
            <div className="home-card__icon-wrap">
              <span className="home-card__icon">{c.icon}</span>
            </div>
            <h3 className="home-card__title">{c.title}</h3>
            <p className="home-card__desc">{c.desc}</p>
            <button className="home-card__btn">{c.cta}</button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HomeCards;
