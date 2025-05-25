import validate from '../../api/validate';

export default function InputPostalCode() {
  return (
    <label>
      Postal Code:{' '}
      <input
        type="text"
        name="postalCode"
        pattern="\d{5}(-\d{4})?"
        title="Enter the zip code in the format XXXXX or XXXXX-XXXX"
        autoComplete="off"
        onInput={validate}
        required
      />
    </label>
  );
}
