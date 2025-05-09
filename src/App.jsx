import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import AuthGuard from './components/handlers/AuthGuard';
import WebSocketService from './services/WebSocketService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ResetPasswordPage from './pages/ResetPasswordPage';
import NewPasswordSet from './components/resetPassword/NewPasswordSet';
import ChatPage from './pages/ChatPage';

function App() {
  const [claims, setClaims] = useState(TokenManager.getClaims());

  const setupWebSocket = (userId) => {
    const brokerURL = 'ws://localhost:8080/ws';

    WebSocketService.connect(brokerURL, () => {
      console.log('WebSocket connected');

      WebSocketService.subscribe('/topic/announcements', (message) => {
        const notification = message;
        if (String(notification.authorId) === String(userId)) {
          console.log('Skipping self-notification for:', notification);
          return;
        }

        toast.info(`New announcement from ${notification.authorName}: ${notification.announcementTitle}`, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      });
    });
  };

  useEffect(() => {
    if (claims) {
      setupWebSocket(claims.userId);
    }

    return () => {
      WebSocketService.disconnect();
    };
  }, [claims]);

  const handleLogin = (newClaims) => {
    if (newClaims) {
      setClaims(newClaims);
      setupWebSocket(newClaims.userId);
      console.log('WebSocket setup on login');
    } else {
      console.error('Invalid claims received during login:', newClaims);
    }
  };

  const handleLogout = () => {
    TokenManager.clear();
    WebSocketService.disconnect();
    setClaims(null);
  };

  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Router>
        <ToastContainer />
        <Navbar claims={claims} onLogout={handleLogout} />
        <AuthGuard claims={claims} setClaims={setClaims} />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/announcements" element={<AnnouncementsPage />} />
          <Route path="/posts" element={<MyPostsPage claims={claims} />} />
          <Route path="/announcements/:id" element={<AnnouncementBodyPage />} />
          <Route path="/sicknesses" element={<SicknessManagementPage claims={claims} />} />
          <Route path="/managersManagement" element={<ManagersManagementPage claims={claims} />} />
          <Route path="/caretakers" element={<CaretakersPage />} />
          <Route path="/profile/:id" element={<ProfilePage claims={claims} />} />
          <Route path="/reset-password/email" element={<ResetPasswordPage />} />
          <Route path="/reset-password/new" element={<NewPasswordSet />} />
          <Route path="/messages" element={<ChatPage claims={claims} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
