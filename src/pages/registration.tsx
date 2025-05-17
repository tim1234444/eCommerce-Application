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
            pattern="[A-Za-zА]{2,30}"
            required
          />
        </label>
        <label>
          Last name: <input type="text" name="lastName" required />
        </label>
        <label>
          Email: <input type="email" name="email" id="email" required />
        </label>
        <label>
          Password:{' '}
          <input type="password" name="password" id="password" required />
        </label>
      </fieldset>
      <fieldset>
        <legend>Adress:</legend>
        <label>
          Street name: <input type="text" name="streetName" required />
        </label>
        <label>
          Street number: <input type="text" name="streetNumber" required />
        </label>
        <label>
          Postal Code: <input type="text" name="postalCode" required />
        </label>
        <label>
          City: <input type="text" name="city" required />
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
