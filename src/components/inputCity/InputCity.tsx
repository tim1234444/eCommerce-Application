import validate from '../../api/validate';

interface InputNameProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputCity({ value, onChange }: InputNameProps) {
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
        value={value}
        onChange={onChange}
        required
      />
    </label>
  );
}
