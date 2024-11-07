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
import CaretakerSignUp from './components/SignUp/CaretakerSignUp';
import CaretakersPage from './pages/CaretakersPage';

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
          <Route path="/announcements/:id" element={<AnnouncementBodyPage />}/>
          <Route path="/sicknesses" element={<SicknessManagementPage />}></Route>
          <Route path="/managersManagement" element={<ManagersManagementPage />}></Route>
          <Route path="/caretakers" element={<CaretakersPage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
