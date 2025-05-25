import validate from '../../api/validate';

export default function InputPassword() {
  return (
    <label>
      Password:{' '}
      <input
        type="password"
        name="password"
        id="password"
        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$"
        autoComplete="off"
        title="The password must contain at least 1 uppercase and 1 lowercase letter, one digit and be at least 8 characters long."
        onInput={validate}
        required
      />
    </label>
  );
}
