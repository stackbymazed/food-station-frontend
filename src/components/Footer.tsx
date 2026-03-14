"use client";

import { Facebook, Twitter, Instagram, Linkedin, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-logo">
              <span className="text-primary">Tay</span>Food
            </div>
            <p className="footer-desc">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.
            </p>
            <div className="top-bar-social" style={{ gap: '12px' }}>
              <a href="#" className="social-icon" style={{ background: '#1e293b' }}><Facebook size={14} /></a>
              <a href="#" className="social-icon" style={{ background: '#1e293b' }}><Twitter size={14} /></a>
              <a href="#" className="social-icon" style={{ background: '#1e293b' }}><Instagram size={14} /></a>
              <a href="#" className="social-icon" style={{ background: '#1e293b' }}><Linkedin size={14} /></a>
            </div>
          </div>

          <div>
            <h4>Useful Links</h4>
            <ul className="footer-links">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Our Menu</a></li>
              <li><a href="#">Delivery Info</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#">Orders Return</a></li>
              <li><a href="#">Latest News</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms & Conditions</a></li>
            </ul>
          </div>

          <div>
            <h4>Newsletter</h4>
            <p style={{ marginBottom: '16px' }}>Subscribe our newsletter to get more updates.</p>
            <div className="search-bar" style={{ padding: '4px', background: 'rgba(255,255,255,0.1)' }}>
              <input type="email" placeholder="Your Email" style={{ background: 'transparent', color: 'white', padding: '0 12px' }} />
              <button className="btn btn-primary" style={{ padding: '8px 16px' }}><ArrowRight size={16} /></button>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} FoodStation. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
