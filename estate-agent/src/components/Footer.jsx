import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer__inner">
        <div className="footer__col">
          <h4 className="footer__heading">EstateFind</h4>
          <p className="footer__text">
            Your trusted platform for finding the perfect property. Buy, rent, or sell with confidence.
          </p>
        </div>
        <div className="footer__col">
          <h4 className="footer__heading">Quick Links</h4>
          <ul className="footer__list">
            <li><Link to="/buy">Buy</Link></li>
            <li><Link to="/rent">Rent</Link></li>
            <li><Link to="/sell">Sell</Link></li>
            <li><Link to="/feed">Feed</Link></li>
            <li><Link to="/find-agent">Find an Agent</Link></li>
          </ul>
        </div>
        <div className="footer__col">
          <h4 className="footer__heading">Support</h4>
          <ul className="footer__list">
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">FAQs</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
          </ul>
        </div>
        <div className="footer__col">
          <h4 className="footer__heading">Contact</h4>
          <ul className="footer__list">
            <li>info@estatefind.com</li>
            <li>+1 (555) 123-4567</li>
            <li>123 Main St, London</li>
          </ul>
        </div>
      </div>
      <div className="footer__bottom">
        <p>&copy; {new Date().getFullYear()} EstateFind. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
