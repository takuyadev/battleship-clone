import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
export interface PopupProps {
  children: React.ReactNode;
  className?: string;
  onAnimationEnd?: React.AnimationEventHandler<HTMLDivElement>;
}

const Popup = ({
  className,
  children,
  onAnimationEnd = () => {},
}: PopupProps) => {
  return createPortal(
    <motion.div
      onAnimationEnd={onAnimationEnd}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`${className} fixed flex items-center justify-center  w-screen h-screen  bg-black opacity-90 z-20 `}
    >
      {children}
    </motion.div>,
    document.getElementById('popup')!
  );
};

export default Popup;
