import { Link, useNavigate } from 'react-router-dom';
import RegistrationForm from '../components/registrationForm/RegistrationFrom';
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
export default function RegistrationPage() {
  const navigate = useNavigate();
  const [currentState, setCurrentState] = useState<boolean>(false);
  useEffect(() => {
    if (currentState === true) navigate('/', { replace: true });
  }, [currentState, navigate]);
  return (
    <Layout>
      <Link className="button-navigation" to="/authorization">
        To the login page
      </Link>
      <RegistrationForm
        currentState={currentState}
        setCurrentState={setCurrentState}
      />
    </Layout>
  );
}
