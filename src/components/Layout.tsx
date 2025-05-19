import { useEffect, useState, type ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Layout.css';
interface IChildren {
  children: ReactNode;
}
const isLogin = localStorage.getItem('access_token');
console.log(isLogin);
export default function Layout({ children }: IChildren) {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    setIsLogin(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    setIsLogin(false);
    navigate('/autorisation');
  };

  return (
    <>
      <header className="header">
        <nav className="nav">
          <Link to="/" className="logo">
            🛒 eCommerce
          </Link>
          {isLogin && <button onClick={handleLogout}>Logout</button>}
          <ul className="nav-links">
            {!isLogin && (
              <>
              <li>
                <Link to="/registration">Registration</Link>
              </li>
              <li>
                  <Link to="/login" className="auth-link">
                    Autorisation
                  </Link>
              </li>
              </>
            )}
            <li>
              <Link to="/">Main</Link>
            </li>
          </ul>
        </nav>
      </header>

      <main>{children}</main>

      <footer className="footer">
        <p>eCommerce 2025.</p>
      </footer>
    </>
  );
}
