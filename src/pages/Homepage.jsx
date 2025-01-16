import React, { useState, useEffect } from 'react';
import '../css/homepage.css';
import axios from 'axios';
import { getStatistics } from '../services/UserRepository';
import { get } from 'react-hook-form';

const Homepage = () => {
  const [stats, setStats] = useState(null);

  const fetchStatistics = async () => {
    try {
      const response = await getStatistics();
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  }

  useEffect(() => {
    fetchStatistics();
  }, []);

  if (stats) return (
    <div className="homepage-container flex items-center justify-center min-h-screen bg-green-50">
      <section className="stats-section bg-white p-8 rounded-lg shadow-md text-center mt-10 max-w-4xl mx-auto">
      <h1 className="main-heading text-4xl font-bold text-green-700 mb-5">
          <i className="fas fa-hand-holding-heart"></i> Welcome to CareNest
        </h1>
      <h2 className="text-2xl font-semibold text-green-700 mb-4">Manager Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="stat-box bg-green-100 p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold text-green-800">Total Caretakers</h3>
          <p className="text-2xl font-semibold text-gray-700">{stats.totalCaretakers}</p>
        </div>
        <div className="stat-box bg-green-100 p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold text-green-800">Total Patients</h3>
          <p className="text-2xl font-semibold text-gray-700">{stats.totalPatients}</p>
        </div>
        <div className="stat-box bg-green-100 p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold text-green-800">Caretaker-to-Patient Ratio</h3>
          <p className="text-2xl font-semibold text-gray-700">
            {stats.caretakerToPatientRatio}
          </p>
        </div>
      </div>
    </section>
    </div>
    
  )

  return (
    <div className="homepage-container flex items-center justify-center min-h-screen bg-green-50">
      <section className="intro-section bg-white p-10 rounded-lg shadow-md text-center max-w-3xl mx-auto">
        <h1 className="main-heading text-4xl font-bold text-green-700 mb-5">
          <i className="fas fa-hand-holding-heart"></i> Welcome to CareNest
        </h1>
        <p className="intro-text text-lg text-gray-600 mb-8">
          Connecting caregivers with those in need of care. Explore services, read announcements, and start your journey towards better health today.
        </p>
        <a href="/login" className="btn btn-success btn-lg">
          <i className="fas fa-stethoscope"></i> Explore Services
        </a>
      </section>
    </div>
  );
};

export default Homepage;
