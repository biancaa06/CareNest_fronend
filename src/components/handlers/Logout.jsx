import { useNavigate } from "react-router-dom";

function Logout({onLogout}){
    const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return <button onClick={handleLogout}>Logout</button>;
}

export default Logout