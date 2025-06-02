import type { JSX } from 'react';
import { Navigate } from 'react-router-dom';
import getCookie from '../api/getCoockie';

export const RedirectIfAuth = ({ children }: { children: JSX.Element }) => {
  if (getCookie().access_token) {
    return <Navigate to="/" replace />;
  }

  return children;
};
