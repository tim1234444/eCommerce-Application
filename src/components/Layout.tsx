import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
interface IChildren {
  children: ReactNode;
}

export default function Layout({ children }: IChildren) {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/one">Page One</Link>
            </li>
            <li>
              <Link to="/two">Page Two</Link>
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
