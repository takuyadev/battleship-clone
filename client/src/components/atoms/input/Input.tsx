interface IInput_Props extends React.ComponentProps<'input'> {
  className?: string;
}
const Input = ({ className, ...props }: IInput_Props) => {
  return (
    <>
      <input
        className={`px-4 py-3 placeholder:font-body ${className} w-full bg-slate-100 font-bold duration-200 rounded-2xl transition-all focus:border-teal-500 border-2 focus:outline-none invalid:bg-rose-100 invalid:border-rose-500`}
        {...props}
      />
    </>
  );
};

export default Input;
