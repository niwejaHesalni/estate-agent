import React from 'react';
import Hero from '../components/Hero';

function SellPage() {
  return (
    <>
      <Hero title={"Sell your home"} subtitle="Get a free estimate and connect with top agents." />
      <div className="info-page">
        <div className="info-cards">
          {[
            { icon: '📊', title: 'Free Valuation', desc: 'Get an instant estimate of your home\'s value based on recent sales in your area.' },
            { icon: '👨‍💼', title: 'Find an Agent', desc: 'Connect with experienced local agents who know how to price and market your home.' },
            { icon: '💸', title: 'Half the Fee', desc: 'We charge half the listing fee of traditional agents — saving you thousands.' },
            { icon: '📸', title: 'Professional Photos', desc: 'Our photographers make your home look its best to attract the most buyers.' },
          ].map((c) => (
            <div key={c.title} className="info-card">
              <div className="info-card__icon">{c.icon}</div>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
              <button className="home-card__btn">Get started</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default SellPage;
