import validate from '../../api/validate';

interface InputNameProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputEmail({ value, onChange }: InputNameProps) {
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
        value={value}
        onChange={onChange}
        required
      />
    </label>
  );
}
