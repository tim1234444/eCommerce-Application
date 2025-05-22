import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import './Navigation.css';

export default function Navigation() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    setIsLogin(!!token);
  }, []);
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    setIsLogin(false);
    navigate('/authorization');
  };
  return (
    <nav className="nav">
      <Link to="/" className="logo">
        <img src={logo} alt="eCommerce Logo" />
      </Link>
      {isLogin && <button onClick={handleLogout}>Logout</button>}
      <ul className="nav-links">
        {!isLogin && (
          <>
            <li>
              <Link to="/authorization" className="auth-link">
                🔑 Authorisation
              </Link>
            </li>
            <li>
              <Link to="/registration" className="auth-link">
                ➕ Registration
              </Link>
            </li>
          </>
        )}
        <li>
          <Link to="/">Main</Link>
        </li>
      </ul>
    </nav>
  );
}
