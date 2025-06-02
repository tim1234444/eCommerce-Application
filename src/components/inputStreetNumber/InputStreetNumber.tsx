import validate from '../../api/validate';

interface InputNameProps {
  value: string | number | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputStreetNumber({ value, onChange }: InputNameProps) {
  return (
    <label>
      Street number:{' '}
      <input
        type="text"
        name="streetNumber"
        id="streetNumber"
        pattern="^\d{1,5}[A-Za-z]?$"
        title="Enter the house number (up to 5 digits and, if necessary, one letter)"
        autoComplete="off"
        onInput={validate}
        value={value}
        onChange={onChange}
        required
      />
    </label>
  );
}
