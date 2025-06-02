import validate from '../../api/validate';

interface InputNameProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputPostalCode({ value, onChange }: InputNameProps) {
  return (
    <label>
      Postal Code:{' '}
      <input
        type="text"
        name="postalCode"
        pattern="\d{5}(-\d{4})?"
        title="Enter the zip code in the format XXXXX or XXXXX-XXXX"
        autoComplete="off"
        onInput={validate}
        value={value}
        onChange={onChange}
        required
      />
    </label>
  );
}
