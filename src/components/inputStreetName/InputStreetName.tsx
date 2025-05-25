import validate from '../../api/validate';
export default function InputStreetName() {
  return (
    <label>
      Street name:{' '}
      <input
        type="text"
        name="streetName"
        minLength={1}
        maxLength={20}
        title="Latin letters, minimum length (2 characters) and maximum length (10 characters)."
        autoComplete="off"
        onInput={validate}
        required
      />
    </label>
  );
}
