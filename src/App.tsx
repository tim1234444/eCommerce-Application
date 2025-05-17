import './App.css';
import { RedirectIfAuth } from './components/RedirectIfAuth';
import LoginPage from './pages/loginPage';
import MainPage from './pages/mainPage';
import RegistrationPage from './pages/registration';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/autorisation"
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
