"use client";

import {
  MapPin, Star, Play, ArrowRight, Facebook, Twitter, Instagram
} from 'lucide-react';
import Counter from '@/components/Counter';

const popularFoods = [
  { id: 1, name: 'Spicy Burger', price: '$12.00', rating: 4.8, type: 'Burger', img: '/images/spicy-burger.png', tag: 'Hot' },
  { id: 2, name: 'Beef Steaks', price: '$24.00', rating: 5.0, type: 'Meat', img: '/images/beef-steaks.png', tag: 'Popular' },
  { id: 3, name: 'Chicken Biryani', price: '$18.00', rating: 4.9, type: 'Rice', img: '/images/chicken-biryani.png', tag: 'New' },
  { id: 4, name: 'Italian Pasta', price: '$15.00', rating: 4.7, type: 'Pasta', img: '/images/hero-pasta.png', tag: 'Classic' },
];

const chefs = [
  { id: 1, name: 'Bred Tennant', role: 'Head Chef', img: '/images/chef-1.png' },
  { id: 2, name: 'Alaxendra Danvers', role: 'Sous Chef', img: '/images/chef-2.png' },
  { id: 3, name: 'John Philip', role: 'Pastry Chef', img: '/images/chef-1.png' },
];

export default function LandingPage() {
  return (
    <main>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <span className="hero-badge">😋 Simply Delicious Foods</span>
            <h1 className="hero-title">Delicious Foods With<br />Wonderful Eating</h1>
            <p className="hero-text">
              Fresh and healthy food available here. Discover the best food from popular restaurants and enjoy your dining experience.
            </p>
            <div className="search-bar">
              <input type="text" placeholder="Search Your Food..." />
              <button className="btn btn-primary" style={{ borderRadius: '999px' }}>Search</button>
            </div>
          </div>
          <div className="hero-image-wrapper">
            <div className="discount-circle">
              <strong>35%</strong>
              <span>OFF</span>
            </div>
            <img src="/images/hero-pasta.png" alt="Delicious Pasta" className="hero-image" />
          </div>
        </div>
      </section>

      {/* Offers */}
      <section className="offers container">
        <h4 className="section-subtitle">Top Offer</h4>
        <h2 className="section-title">Up To 75% Off For This Day</h2>

        <div className="offers-grid">
          <div className="offer-card">
            <div className="offer-content">
              <h3>Beef Steak</h3>
              <p>Get up to 30% off on your first order of delicious beef steak.</p>
              <button className="btn btn-secondary">Order Now <ArrowRight size={16} /></button>
            </div>
            <img src="/images/beef-steaks.png" alt="Beef Steak" className="offer-img" />
          </div>

          <div className="offer-card" style={{ background: 'var(--primary)', color: 'white' }}>
            <div className="offer-content">
              <h3 style={{ color: 'white' }}>Or Mutton!</h3>
              <p style={{ color: 'rgba(255,255,255,0.8)' }}>Get up to 25% off on your first order of delicious mutton.</p>
              <button className="btn" style={{ background: 'white', color: 'var(--primary)' }}>Order Now <ArrowRight size={16} /></button>
            </div>
            <img src="/images/chicken-biryani.png" alt="Mutton" className="offer-img" />
          </div>
        </div>
      </section>

      {/* Book A Table */}
      <section className="book-table">
        <div className="container">
          <div>
            <img src="/images/spicy-burger.png" alt="Restaurant Waiter" style={{ borderRadius: '24px', height: '100%', objectFit: 'cover' }} />
          </div>
          <div className="book-form-card">
            <h2>Book A Table</h2>
            <form className="form-grid">
              <input type="date" className="form-input" />
              <input type="time" className="form-input" />
              <input type="text" placeholder="Your Name" className="form-input" />
              <input type="tel" placeholder="Phone Number" className="form-input" />
              <input type="number" placeholder="People" className="form-input" />
              <button className="book-btn" style={{ gridColumn: 'span 2' }}>Book Now</button>
            </form>
          </div>
        </div>
      </section>

      {/* Popular Foods */}
      <section className="popular-foods container">
        <h4 className="section-subtitle">Real Taste</h4>
        <h2 className="section-title">Popular Delicious Foods</h2>

        <div className="filter-tabs">
          <button className="filter-tab active">All</button>
          <button className="filter-tab">Pizza</button>
          <button className="filter-tab">Burger</button>
          <button className="filter-tab">Pasta</button>
          <button className="filter-tab">Drinks</button>
          <button className="filter-tab">Meats</button>
        </div>

        <div className="food-grid">
          {popularFoods.map(food => (
            <div className="food-card" key={food.id}>
              {food.tag && <span className="tag">{food.tag}</span>}
              <div className="food-img-wrapper">
                <img src={food.img} alt={food.name} />
              </div>
              <h3 className="food-title">{food.name}</h3>
              <div className="rating">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="food-price">{food.price}</p>
              <button className="add-cart-btn">Add to Cart</button>
            </div>
          ))}
        </div>
      </section>

      {/* Experts Chefs */}
      <section className="chefs">
        <div className="container">
          <h4 className="section-subtitle">Our Team</h4>
          <h2 className="section-title">Meet Our Expert Chefs</h2>

          <div className="chef-grid">
            {chefs.map(chef => (
              <div className="chef-card" key={chef.id}>
                <img src={chef.img} alt={chef.name} className="chef-img" />
                <div className="chef-info">
                  <h3 className="chef-name">{chef.name}</h3>
                  <p className="chef-role">{chef.role}</p>
                  <div className="top-bar-social" style={{ justifyContent: 'center', marginTop: '16px' }}>
                    <a href="#" className="social-icon" style={{ background: '#e2e8f0', color: '#1e293b' }}><Facebook size={14} /></a>
                    <a href="#" className="social-icon" style={{ background: '#e2e8f0', color: '#1e293b' }}><Twitter size={14} /></a>
                    <a href="#" className="social-icon" style={{ background: '#e2e8f0', color: '#1e293b' }}><Instagram size={14} /></a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="video-section">
        <div className="video-box">
          <img src="/images/beef-steaks.png" alt="Food Video 1" />
          <div className="video-overlay">
            <h3 style={{ fontSize: '28px' }}>Easy To Order Our All<br />Food</h3>
            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              <button className="btn btn-primary" style={{ fontSize: '14px', padding: '10px 20px' }}>App Store</button>
              <button className="btn btn-secondary" style={{ fontSize: '14px', padding: '10px 20px' }}>Play Store</button>
            </div>
          </div>
        </div>
        <div className="video-box">
          <img src="/images/hero-pasta.png" alt="Food Video 2" />
        </div>
        <div className="video-box">
          <img src="/images/spicy-burger.png" alt="Food Video 3" />
          <div className="video-overlay">
            <button className="play-btn"><Play fill="currentColor" size={28} /></button>
          </div>
        </div>
        <div className="video-box">
          <img src="/images/chicken-biryani.png" alt="Food Video 4" />
        </div>
      </section>

      {/* Stats */}
      <section className="stats">
        <div className="container stats-grid">
          <div className="stat-item">
            <Counter end={2129} suffix="+" duration={2000} />
            <p className="stat-label">Delicious Items</p>
          </div>
          <div className="stat-item">
            <Counter end={5} suffix="+" duration={1500} />
            <p className="stat-label">Experience Chefs</p>
          </div>
          <div className="stat-item">
            <Counter end={1000} suffix="+" duration={2500} />
            <p className="stat-label">Happy Customers</p>
          </div>
          <div className="stat-item">
            <Counter end={1} suffix="+" duration={1000} />
            <p className="stat-label">Dining Space</p>
          </div>
        </div>
      </section>

    </main>
  );
}