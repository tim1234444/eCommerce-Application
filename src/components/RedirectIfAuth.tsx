import type { JSX } from 'react';
import { Navigate } from 'react-router-dom';

export const RedirectIfAuth = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem('access_token');
  
  if (token) {
   
    return <Navigate to="/" replace />;
  }

  
  return children;
};
