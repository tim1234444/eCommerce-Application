import registrationApi from '../api/registration';
export default function RegistrationPage() {
  return (
    <form className="form-registration" action={registrationApi} method="post">
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
            required
          />
        </label>
        <label>
          Date of birth:{' '}
          <input type="date" name="dateOfBirth" id="dateOfBirth" required />
        </label>
        <label>
          Email: <input type="email" name="email" id="email" required />
        </label>
        <label>
          Password:{' '}
          <input
            type="password"
            name="password"
            id="password"
            pattern="(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}"
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
            pattern="[A-Za-zА]{2,10}"
            minLength={2}
            maxLength={10}
            title="Latin letters, minimum length (2 characters) and maximum length (10 characters)."
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
            pattern="[A-Za-zА\s-]{2,50}"
            title="Enter a city name consisting of letters (2-50 characters), spaces, and hyphens."
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
      </fieldset>
      <button type="submit">Registration</button>
    </form>
  );
}
