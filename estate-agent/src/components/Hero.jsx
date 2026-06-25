import React from 'react';

function Hero({ title, subtitle }) {
  return (
    <section className="hero">
      <div className="hero-overlay" />
      <div className="hero-content">
        <h1 className="hero-headline">{title || 'Claim your home\nand get a free estimate'}</h1>
        {subtitle && <p className="hero-subtitle">{subtitle}</p>}
      </div>
    </section>
  );
}

export default Hero;
