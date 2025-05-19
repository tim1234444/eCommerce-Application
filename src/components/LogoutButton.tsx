import { useNavigate } from 'react-router-dom';

export default function LogoutButton() {
  const navigate = useNavigate();

  function handleLogout() {
    sessionStorage.removeItem('token');
    navigate('/');
  }

  return <button onClick={handleLogout}>Выйти</button>;
}
