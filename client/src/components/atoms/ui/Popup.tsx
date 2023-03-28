import { createPortal } from 'react-dom';

export interface PopupProps {
  className?: string;
  children: React.ReactNode;
}

const Popup = ({ className, children}: PopupProps) => {
  return createPortal(
    <div
      className={`${className} fixed flex items-center justify-center  w-screen h-screen  bg-black opacity-90 z-20 `}
    >
      {children}
    </div>,
    document.getElementById("popup")!
  );
};

export default Popup;
