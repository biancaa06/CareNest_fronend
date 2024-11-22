import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/NavBar';
import Homepage from './pages/Homepage';
import Login from './pages/LogInPage';
import SignUp from './pages/SignUpPage';
import AnnouncementsPage from './pages/AnnouncementsPage';
import AnnouncementBodyPage from './pages/AnnouncementBodyPage';
import SicknessManagementPage from './pages/SicknessManagementPage';
import ManagersManagementPage from './pages/ManagersManagementPage';
import CaretakersPage from './pages/CaretakersPage';
import ProfilePage from './pages/ProfilePage';
import TokenManager from './services/TokenManager';
import MyPostsPage from './pages/MyPostsPage';

function App() {
  const [claims, setClaims] = useState(TokenManager.getClaims());

  const handleLogin = (newClaims) => {
    if (newClaims) {
      setClaims(newClaims);
    } else {
      console.error("Invalid claims received during login:", newClaims);
    }
  };

  const handleLogout = () => {
    TokenManager.clear();
    setClaims(null);
  };

  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Router>
        <Navbar claims={claims} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/announcements" element={<AnnouncementsPage />} />
          <Route path="/posts" element={<MyPostsPage claims={claims} />} />
          <Route path="/announcements/:id" element={<AnnouncementBodyPage />} />
          <Route path="/sicknesses" element={<SicknessManagementPage claims={claims}/>} />
          <Route path="/managersManagement" element={<ManagersManagementPage claims={claims}/>} />
          <Route path="/caretakers" element={<CaretakersPage />} />
          <Route path="/profile/:id" element={<ProfilePage claims={claims}/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
