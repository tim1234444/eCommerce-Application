export default function InputdateOfBirth() {
  return (
    <label>
      Date of birth:{' '}
      <input
        type="date"
        name="dateOfBirth"
        id="dateOfBirth"
        max="2013-12-31"
        title="over 13 years old"
        required
      />
    </label>
  );
}
