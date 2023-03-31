import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { fadeIn } from '@data/anim';
import { AnimationEventHandler } from 'react';

export interface PopupProps {
  children: React.ReactNode;
  isShow: boolean;
  className?: string;
}

const Popup = ({ className = '', children, isShow, ...props }: PopupProps) => {
  return createPortal(
    <AnimatePresence>
      {isShow && (
        <motion.div
          variants={fadeIn}
          initial='initial'
          animate='animate'
          exit='exit'
          className={`${className} fixed w-screen h-screen before:fixed before:w-screen before:h-screen before:bg-black before:opacity-75 z-50`}
          {...props}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>,
    document.getElementById('popup')!
  );
};

export default Popup;
