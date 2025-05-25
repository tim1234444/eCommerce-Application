import registrationApi from '../../api/registration';
import InputStreetName from '../inputStreetName/InputStreetName';
import InputCity from '../inputCity/InputCity';
import InputEmail from '../inputEmail/InputEmail';
import InputPassword from '../inputPassword/InputPassword';
import InputLastName from '../inputLastName/InputLastName';
import InputName from '../inputName/InputName';
import InputStreetNumber from '../inputStreetNumber/InputStreetNumber';
import InputdateOfBirth from '../inputdateOfBirth/inputdateOfBirth';
import InputPostalCode from '../postalCode/InputPostalCode';
import SubmitButton from '../submitButton';
import './registrationForm.css';
export default function RegistrationForm({
  currentState,
  setCurrentState,
}: {
  currentState: boolean;
  setCurrentState: (currentState: boolean) => void;
}) {
  console.log(currentState);
  return (
    <form
      className="form-registration"
      action={(e) => registrationApi(e, currentState, setCurrentState)}
    >
      <fieldset>
        <legend>Contacts:</legend>
        <InputName />
        <InputLastName />
        <InputdateOfBirth />
        <InputEmail />
        <InputPassword />
      </fieldset>
      <fieldset>
        <legend>Adress:</legend>
        <InputPostalCode />
        <InputCity />
        <InputStreetName />
        <InputStreetNumber />
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
  );
}
