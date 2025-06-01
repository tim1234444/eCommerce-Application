import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import getCookie from '../../api/getCoockie';
import logo from '../../assets/logo.png';
import './Navigation.css';

export default function Navigation() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState<boolean>(false);

  useEffect(() => {
    const token = getCookie().access_token;
    setIsLogin(!!token);
  }, []);
  const handleLogout = () => {
    document.cookie = `access_token=;expires=${new Date(0)}`;
    setIsLogin(false);
    navigate('/authorization');
  };
  return (
    <nav className="nav">
      <Link to="/" className="logo">
        <img src={logo} alt="eCommerce Logo" />
      </Link>

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
        {isLogin && (
          <>
            <li>
              <Link to="/catalog">Catalog</Link>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
