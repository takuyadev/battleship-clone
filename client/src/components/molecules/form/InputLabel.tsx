import { ComponentProps } from 'react';
import Input from '@components/atoms/input/Input';
import Label from '@components/atoms/text/Label';

export interface InputLabelProps extends ComponentProps<'input'> {
  label: string;
  name: string;
  htmlFor: string;
  icons?: React.ReactNode;
  className?: string;
}

const InputLabel = ({
  label,
  name,
  htmlFor,
  icons,
  className,
  ...props
}: InputLabelProps) => {
  return (
    <div className={`${className && className} transition-all relative w-full`}>
      <Input
        {...props}
        className='peer/input ease-out w-full pt-5 pb-1 px-[0.75em]'
        name={name}
        placeholder={' '}
        id={htmlFor}
      />
      <Label
        className='absolute transition-all translate-x-4 top-2 left-0 peer-placeholder-shown/input:top-4 peer-focus/input:top-2 peer-focus/input:text-indigo-500'
        htmlFor={htmlFor}
      >
        {label}
      </Label>
      <div className='transition-all duration-200 absolute right-3 top-1/3 text-2xl peer-focus/input:text-teal-500 text-slate-700'>
        {icons && icons}
      </div>
    </div>
  );
};

export default InputLabel;
