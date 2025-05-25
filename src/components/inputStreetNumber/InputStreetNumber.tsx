import validate from '../../api/validate';
export default function InputStreetNumber() {
  return (
    <label>
      Street number:{' '}
      <input
        type="text"
        name="streetNumber"
        id="streetNumber"
        pattern="^\d{1,5}[A-Za-z]?$"
        title="Enter the house number (up to 5 digits and, if necessary, one letter)"
        autoComplete="off"
        onInput={validate}
        required
      />
    </label>
  );
}
