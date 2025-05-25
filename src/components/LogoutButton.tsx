import { useNavigate } from 'react-router-dom';

export default function LogoutButton() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem('access_token');
    navigate('/');
  }

  return <button onClick={handleLogout}>Выйти</button>;
}
