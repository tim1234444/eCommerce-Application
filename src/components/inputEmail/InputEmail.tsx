import validate from '../../api/validate';

export default function InputEmail() {
  return (
    <label>
      Email:{' '}
      <input
        type="email"
        name="email"
        id="email"
        title="Please match the forma: example@test.com"
        pattern="^\S+@\S+\.\S{2,}$"
        autoComplete="off"
        onInput={validate}
        required
      />
    </label>
  );
}
