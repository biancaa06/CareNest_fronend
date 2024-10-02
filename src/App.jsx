import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/NavBar';
import Homepage from './pages/Homepage';
import Login from './pages/LogInPage';
import SignUp from './pages/SignUpPage';
import AnnouncementsPage from './pages/AnnouncementsPage';

function App() {
  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/announcements" element={<AnnouncementsPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
