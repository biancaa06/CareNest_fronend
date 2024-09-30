import React from 'react';
import '../css/homepage.css';

const Homepage = () => {
  return (
    <div className="homepage-container flex items-center justify-center min-h-screen bg-green-50">
      <section className="intro-section bg-white p-10 rounded-lg shadow-md text-center max-w-3xl mx-auto">
        <h1 className="main-heading text-4xl font-bold text-green-700 mb-5">
          <i className="fas fa-hand-holding-heart"></i> Welcome to CareNest
        </h1>
        <p className="intro-text text-lg text-gray-600 mb-8">
          Connecting caregivers with those in need of care. Explore services, read announcements, and start your journey towards better health today.
        </p>
        <a href="/services" className="btn btn-success btn-lg">
          <i className="fas fa-stethoscope"></i> Explore Services
        </a>
      </section>
    </div>
  );
};

export default Homepage;
