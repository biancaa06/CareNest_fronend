import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/NavBar'
import Homepage from './pages/homepage'
import Login from './pages/LogInPage';
import SignUp from './pages/SignUpPage';

function App() {

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/logIn" element={<Login />} />
          <Route path="/signUp" element={<SignUp />}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
