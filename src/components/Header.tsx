"use client";

import { MapPin, Mail, Facebook, Twitter, Instagram, Linkedin, Search, ShoppingCart, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path ? 'text-primary' : '';

  return (
    <>
      {/* Top Bar */}
      <div className="top-bar">
        <div className="container">
          <div className="top-bar-info">
            <span className="info-item">
              <MapPin size={16} /> 123 Street, New York, USA
            </span>
            <span className="info-item">
              <Mail size={16} /> info@example.com
            </span>
          </div>
          <div className="top-bar-social">
            <a href="#" className="social-icon"><Facebook size={14} /></a>
            <a href="#" className="social-icon"><Twitter size={14} /></a>
            <a href="#" className="social-icon"><Instagram size={14} /></a>
            <a href="#" className="social-icon"><Linkedin size={14} /></a>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <nav className="navbar">
        <div className="container">
          <div className="logo">
            <span className="text-primary">Tay</span>Food
          </div>
          <ul className="nav-links">
            <li><Link href="/" className={isActive('/')}>Home</Link></li>
            <li><Link href="/about" className={isActive('/about')}>About</Link></li>
            <li><Link href="/menu" className={isActive('/menu')}>Menu</Link></li>
            <li><Link href="/service" className={isActive('/service')}>Service</Link></li>
            <li><Link href="/contact" className={isActive('/contact')}>Contact</Link></li>
          </ul>
          <div className="nav-actions">
            <button className="icon-btn">
              <Search size={22} />
            </button>
            <button className="icon-btn">
              <ShoppingCart size={22} />
              <span className="badge">3</span>
            </button>
            <button className="icon-btn">
              <User size={22} />
            </button>
            <button className="btn btn-primary">Reservation</button>
          </div>
        </div>
      </nav>
    </>
  );
}
