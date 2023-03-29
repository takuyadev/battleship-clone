import React from 'react';
import { fadeIn } from '@data/anim';
import { motion } from 'framer-motion';

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.section
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
