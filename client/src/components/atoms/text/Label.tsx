import { ComponentProps } from "react";

export interface LabelProps extends ComponentProps<'label'> {
  children: React.ReactNode;
  className?: string;
}

const Label = ({ children, className, ...props }: LabelProps) => {
  return (
    <label className={`${className} text-xs text-slate-500`} {...props}>
      {children}
    </label>
  );
};

export default Label;
