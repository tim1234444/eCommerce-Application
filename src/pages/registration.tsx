import { Link, useNavigate } from 'react-router-dom';
import SubmitButton from '../components/submitButton';
import registrationApi from '../api/registration';
import { useState, useEffect } from 'react';
export default function RegistrationPage() {
  const navigate = useNavigate();
  const [currentState, setCurrentState] = useState<boolean>(false);
  useEffect(() => {
    if (currentState === true) navigate('/', { replace: true });
  }, [currentState, navigate]);
  return (
    <div>
      <Link className="button-navigation" to="/autorisation">
        To the login page
      </Link>
      <form
        className="form-registration"
        action={(e) => registrationApi(e, currentState, setCurrentState)}
      >
        <fieldset>
          <legend>Contacts:</legend>
          <label>
            First name:{' '}
            <input
              type="text"
              name="firstName"
              pattern="[A-Za-zА]{2,10}"
              minLength={2}
              maxLength={10}
              title="Latin letters, minimum length (2 characters) and maximum length (10 characters)."
              autoComplete="off"
              required
            />
          </label>
          <label>
            Last name:{' '}
            <input
              type="text"
              name="lastName"
              pattern="[A-Za-zА]{2,10}"
              minLength={2}
              maxLength={10}
              title="Latin letters, minimum length (2 characters) and maximum length (10 characters)."
              autoComplete="off"
              required
            />
          </label>
          <label>
            Date of birth:{' '}
            <input type="date" name="dateOfBirth" id="dateOfBirth" required />
          </label>
          <label>
            Email:{' '}
            <input
              type="email"
              name="email"
              id="email"
              autoComplete="off"
              required
            />
          </label>
          <label>
            Password:{' '}
            <input
              type="password"
              name="password"
              id="password"
              pattern="(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}"
              autoComplete="off"
              title="The password must contain at least one letter, one digit and be at least 8 characters long."
              required
            />
          </label>
        </fieldset>
        <fieldset>
          <legend>Adress:</legend>
          <label>
            Street name:{' '}
            <input
              type="text"
              name="streetName"
              pattern="[A-Za-zА]{2,20}"
              minLength={2}
              maxLength={20}
              title="Latin letters, minimum length (2 characters) and maximum length (10 characters)."
              autoComplete="off"
              required
            />
          </label>
          <label>
            Street number:{' '}
            <input
              type="text"
              name="streetNumber"
              pattern="\d{1,5}([A-Za-z]?)"
              title="Enter the house number (up to 5 digits and, if necessary, one letter)"
              autoComplete="off"
              required
            />
          </label>
          <label>
            Postal Code:{' '}
            <input
              type="text"
              name="postalCode"
              pattern="\d{5}(-\d{4})?"
              title="Enter the zip code in the format XXXXX or XXXXX-XXXX"
              autoComplete="off"
              required
            />
          </label>
          <label>
            City:{' '}
            <input
              type="text"
              name="city"
              minLength={2}
              maxLength={50}
              pattern="[A-Za-zА-Яа-я -]{2,50}"
              title="Enter a city name consisting of letters (2-50 characters), spaces, and hyphens."
              autoComplete="off"
              required
            />
          </label>
          <label>
            Country:
            <select name="country" id="country" required>
              <option value="US">US</option>
              <option value="EN">EN</option>
              <option value="RU">RU</option>
            </select>
          </label>
          <label>
            <input
              type="checkbox"
              name="defaultShippingAddress"
              id="defaultShippingAddress"
            />
            Set as default address
          </label>
        </fieldset>
        <SubmitButton />
      </form>
    </div>
  );
}
