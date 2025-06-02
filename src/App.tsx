import './App.css';
import { RedirectIfAuth } from './components/RedirectIfAuth';
import LoginPage from './pages/loginPage';
import MainPage from './pages/mainPage';
import RegistrationPage from './pages/registrationPage';
import CatalogPage from './pages/catalogPage';
import NotFound from './pages/NotFoundPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductItem from './pages/Product_Item';
import ProfilePage from './pages/ProfilePage/profilePage';

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
        <Route path="/item/:productId" element={<ProductItem />} />
        <Route path="/" element={<MainPage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
