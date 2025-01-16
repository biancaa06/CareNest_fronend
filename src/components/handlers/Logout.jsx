import { useNavigate } from "react-router-dom";

function Logout({onLogout}){
    const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return <button data-cy="logoutButton" onClick={handleLogout}>Logout</button>;
}

export default Logout