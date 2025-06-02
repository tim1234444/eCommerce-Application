interface InputNameProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputdateOfBirth({ value, onChange }: InputNameProps) {
  return (
    <label>
      Date of birth:{' '}
      <input
        type="date"
        name="dateOfBirth"
        id="dateOfBirth"
        max="2013-12-31"
        title="over 13 years old"
        value={value}
        onChange={onChange}
        required
      />
    </label>
  );
}
