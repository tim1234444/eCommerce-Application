import { useState } from 'react';
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

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    password: '',
    postalCode: '',
    city: '',
    streetName: '',
    streetNumber: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form
      className="form-registration"
      action={(e) => registrationApi(e, currentState, setCurrentState)}
    >
      <fieldset>
        <legend>Contacts:</legend>
        <InputName value={formData.firstName} onChange={handleChange} />
        <InputLastName value={formData.lastName} onChange={handleChange} />
        <InputdateOfBirth
          value={formData.dateOfBirth}
          onChange={handleChange}
        />
        <InputEmail value={formData.email} onChange={handleChange} />
        <InputPassword />
      </fieldset>
      <fieldset>
        <legend>Adress:</legend>
        <InputPostalCode value={formData.postalCode} onChange={handleChange} />
        <InputCity value={formData.city} onChange={handleChange} />
        <InputStreetName value={formData.streetName} onChange={handleChange} />
        <InputStreetNumber
          value={formData.streetNumber}
          onChange={handleChange}
        />
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
