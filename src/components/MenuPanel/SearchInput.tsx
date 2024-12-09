import { AutoComplete } from 'antd';
import { useState } from 'react';

export function InputField() {
  const [value, setValue] = useState<string>('');
  console.log(value);

  const handleChange = (data: string) => {
    setValue(data);
  };
  return (
    <AutoComplete
      value={value}
      className='location-input'
      placeholder="Buenos Aires, Cordoba"
      onChange={handleChange}
    >
    </AutoComplete>
  );
};;