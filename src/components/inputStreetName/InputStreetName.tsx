import validate from '../../api/validate';

interface InputNameProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputStreetName({ value, onChange }: InputNameProps) {
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
        value={value}
        onChange={onChange}
        required
      />
    </label>
  );
}
