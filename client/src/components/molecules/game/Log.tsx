import { Message } from '@components/atoms/text/Message';
import { Messages } from '@models/types.common';
import { motion, AnimatePresence } from 'framer-motion';
import { slideRight } from '@data/anim';

export interface LogProps {
  data: Messages;
  className?: string;
}

const Log = ({ data, className }: LogProps): JSX.Element => {
  return (
    <section
      className={`${
        className && className
      } flex flex-col bg-slate-50 border-2 border-slate-100 rounded-lg`}
    >
      <ul className='flex flex-col rounded-lg overflow-y-auto overflow-x-hidden h-96'>
        <AnimatePresence initial={false}>
          {data.map(({ message, icon }, i) => (
            <motion.li
              variants={slideRight}
              initial='initial'
              animate='animate'
              className='flex gap-4 p-4 text-slate-700 rounded-lg even:bg-slate-100'
              key={`message-${data.length - i}`}
            >
              <Message message={message} icon={icon} />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </section>
  );
};

export default Log;
