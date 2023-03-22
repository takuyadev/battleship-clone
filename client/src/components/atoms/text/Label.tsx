interface ILabel_Props extends React.ComponentProps<"label"> {
  children: React.ReactNode;
  className?: string;
}

const Label = ({ children, className, ...props }: ILabel_Props) => {
  return (
    <label className={`${className} text-xs text-slate-500`} {...props}>
      {children}
    </label>
  );
};

export default Label;
