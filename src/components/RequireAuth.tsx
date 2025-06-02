import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import getCookie from '../api/getCoockie';

interface RequireAuthProps {
  children: ReactNode;
}

export default function RequireAuth({ children }: RequireAuthProps) {
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = getCookie().access_token;
    setIsLoggedIn(!!token);
    setIsAuthChecked(true);
  }, []);

  if (!isAuthChecked) {
    return <p>Loading...</p>;
  }

  if (!isLoggedIn) {
    return <Navigate to="/authorization" replace />;
  }

  return <>{children}</>;
}
