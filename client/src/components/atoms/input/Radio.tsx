import { ComponentProps } from 'react';

export interface RadioProps extends ComponentProps<'input'> {
  title: string;
  description: string;
  id: string;
  icon: React.ReactNode;
  className?: string;
}

const Radio = ({
  title,
  description,
  id,
  icon,
  className = '',
  ...props
}: RadioProps) => {
  return (
    <>
      <input id={id} type='radio' className='hidden peer' {...props} />
      <label
        htmlFor={id}
        className={`${className} font-body gap-8 duration-200 w-full inline-flex items-center justify-between p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-indigo-500 peer-checked:border-indigo-600 peer-checked:text-indigo-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700`}
      >
        <div className='block'>
          <div className='w-full text-lg font-semibold'>{title}</div>
          <div className='w-full'>{description}</div>
        </div>
        {icon}
      </label>
    </>
  );
};

export default Radio;
