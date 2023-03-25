import { ChangeEvent } from 'react';
import Radio from '@components/atoms/input/Radio';

type FormOptions = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
};

export interface RadioFieldProps {
  name: string;
  options: FormOptions[];
  onChange: (e: ChangeEvent, key: string, value: string) => void;
}

const RadioField = ({ onChange, name, options }: RadioFieldProps) => {
  return (
    <fieldset className='w-full'>
      <ul className='grid w-full gap-4 md:grid-cols-3'>
        {options.map(({ title, description, id, icon }: FormOptions, i) => (
          <li key={i}>
            <Radio
              onChange={(e) => {
                onChange(e, name, id);
              }}
              required
              title={title}
              description={description}
              name={name}
              value={id}
              id={id}
              icon={icon}
            />
          </li>
        ))}
      </ul>
    </fieldset>
  );
};

export default RadioField;
