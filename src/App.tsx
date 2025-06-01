import './App.css';
import { RedirectIfAuth } from './components/RedirectIfAuth';
import LoginPage from './pages/loginPage';
import MainPage from './pages/mainPage';
import RegistrationPage from './pages/registrationPage';
import NotFound from './pages/NotFoundPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProfilePage from './pages/profilePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/authorization"
          element={
            <RedirectIfAuth>
              <LoginPage />
            </RedirectIfAuth>
          }
        />
        <Route
          path="/registration"
          element={
            <RedirectIfAuth>
              <RegistrationPage />
            </RedirectIfAuth>
          }
        />
        <Route path="/" element={<MainPage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
