import { useEffect, useState, type ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
interface IChildren {
  children: ReactNode;
}
const isLogin = localStorage.getItem('access_token');
console.log(isLogin)
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
      <header>
        <nav>
          {isLogin && <button onClick={handleLogout}>Выйти</button>}
          <ul>
            {!isLogin && (
              <li>
                <Link to="/autorisation">Authorization</Link>
              </li>
            )}
            <li>
              <Link to="/">Main</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>{children}</main>
      <footer>
        <p>eCommerce 2025.</p>
      </footer>
    </>
  );
}