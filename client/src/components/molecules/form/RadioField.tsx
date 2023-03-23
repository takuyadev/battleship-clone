import Radio from '@components/atoms/input/Radio';
import { ChangeEvent } from 'react';

type Options = {
  title: string;
  description: string;
  id: string;
};

interface IRadio {
  onChange: (e: ChangeEvent, key: string, value: string) => void;
  name: string;
  options: Options[];
}

const RadioField = ({ onChange, name, options }: IRadio) => {
  return (
    <fieldset className="w-full">
      <ul className='grid w-full gap-4 md:grid-cols-3'>
        {options.map(({ title, description, id }: Options, i) => {
          return (
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
              />
            </li>
          );
        })}
      </ul>
    </fieldset>
  );
};

export default RadioField;
