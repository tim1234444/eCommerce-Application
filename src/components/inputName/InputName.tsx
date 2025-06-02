import validate from '../../api/validate';

interface InputNameProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputName({ value, onChange }: InputNameProps) {
  return (
    <label>
      First name:{' '}
      <input
        type="text"
        name="firstName"
        pattern="[A-Za-zА]{1,20}"
        minLength={1}
        maxLength={20}
        title="Latin letters, minimum length (1 characters) and maximum length (10 characters)."
        autoComplete="off"
        onInput={validate}
        value={value}
        onChange={onChange}
        required
      />
    </label>
  );
}
