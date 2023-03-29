import { ReactNode } from 'react';
import { fadeIn } from '@data/anim';
import { motion } from 'framer-motion';

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

const PageTransition = ({ children, className }: PageTransitionProps) => {
  return (
    <motion.section
      className={className}
      variants={fadeIn}
      initial='initial'
      animate='animate'
      exit='exit'
    >
      {children}
    </motion.section>
  );
};

export default PageTransition;
