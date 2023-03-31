import { createPortal } from 'react-dom';
import { AnimatePresence, motion, MotionProps } from 'framer-motion';
import { fadeIn } from '@data/anim';

export interface PopupProps extends MotionProps {
  children: React.ReactNode;
  isShow: boolean;
  className?: string;
}

const Popup = ({ className = '', children, isShow, ...props }: PopupProps) => {
  if (!isShow) {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      <motion.div
        variants={fadeIn}
        initial='initial'
        animate='animate'
        exit='exit'
        className={`${className} fixed w-screen h-screen before:bg-black before:opacity-90 z-50`}
        {...props}
      >
        {children}
      </motion.div>
    </AnimatePresence>,
    document.getElementById('popup')!
  );
};

export default Popup;
