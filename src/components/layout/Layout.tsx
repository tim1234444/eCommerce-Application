import './Layout.css';
import type { ReactNode } from 'react';
import Navigation from '../navigation/Navigation';

interface IChildren {
  children: ReactNode;
}

export default function Layout({ children }: IChildren) {
  return (
    <>
      <header className="header">
        <Navigation />
      </header>

      <main>{children}</main>

      <footer className="footer">
        <p>eCommerce 2025.</p>
      </footer>
    </>
  );
}
