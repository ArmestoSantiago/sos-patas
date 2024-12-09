
import { useState } from 'react';

export function InputField() {
  const [value, setValue] = useState<string>('');
  console.log(value);

  const handleChange = (data: string) => {
    setValue(data);
  };
  return (
    <p>asd</p>
  );
};;