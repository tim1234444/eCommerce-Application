import validate from '../../api/validate';

export default function InputCity() {
  return (
    <label>
      City:{' '}
      <input
        type="text"
        name="city"
        minLength={1}
        maxLength={50}
        pattern="[A-Za-zА-Яа-я]{1,50}"
        title="Enter a city name consisting of letters (1-20 characters), spaces, and hyphens."
        autoComplete="off"
        onInput={validate}
        required
      />
    </label>
  );
}
