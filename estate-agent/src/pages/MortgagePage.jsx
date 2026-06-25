import React, { useState } from 'react';
import Hero from '../components/Hero';

function MortgagePage() {
  const [price, setPrice] = useState('');
  const [deposit, setDeposit] = useState('');
  const [years, setYears] = useState('25');
  const [rate, setRate] = useState('4.5');
  const [result, setResult] = useState(null);

  const calculate = () => {
    const p = Number(price) - Number(deposit);
    const r = Number(rate) / 100 / 12;
    const n = Number(years) * 12;
    if (p <= 0 || r <= 0 || n <= 0) return;
    const monthly = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    setResult({ monthly: monthly.toFixed(2), loan: p, total: (monthly * n).toFixed(2) });
  };

  const fmt = (n) => Number(n).toLocaleString('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 });

  return (
    <>
      <Hero title={"Mortgage Calculator"} subtitle="Estimate your monthly repayments in seconds." />
      <div className="mortgage-page">
        <div className="mortgage-calc">
          <h2>Calculate your mortgage</h2>
          <div className="form-group">
            <label>Property Price (£)</label>
            <input type="number" placeholder="e.g. 500000" value={price} onChange={(e) => setPrice(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Deposit (£)</label>
            <input type="number" placeholder="e.g. 50000" value={deposit} onChange={(e) => setDeposit(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Mortgage Term (years)</label>
            <input type="number" placeholder="25" value={years} onChange={(e) => setYears(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Interest Rate (%)</label>
            <input type="number" step="0.1" placeholder="4.5" value={rate} onChange={(e) => setRate(e.target.value)} />
          </div>
          <button className="search-btn" onClick={calculate}>Calculate</button>

          {result && (
            <div className="mortgage-result">
              <div className="mortgage-result__row">
                <span>Monthly repayment</span>
                <strong>{fmt(result.monthly)}</strong>
              </div>
              <div className="mortgage-result__row">
                <span>Loan amount</span>
                <strong>{fmt(result.loan)}</strong>
              </div>
              <div className="mortgage-result__row">
                <span>Total repayable</span>
                <strong>{fmt(result.total)}</strong>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default MortgagePage;
