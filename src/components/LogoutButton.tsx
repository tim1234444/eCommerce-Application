import { useNavigate } from 'react-router-dom';

export default function LogoutButton() {
  const navigate = useNavigate();

  function handleLogout() {
    document.cookie = `access_token=;expires=${new Date(0)}`;
    navigate('/');
  }

  return <button onClick={handleLogout}>Выйти</button>;
}
