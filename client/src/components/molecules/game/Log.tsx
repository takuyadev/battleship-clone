import { Message } from '@components/atoms/text/Message';
import { Messages } from '@models/types.common';
import { AnimatePresence, motion } from 'framer-motion';

export interface LogProps {
  data: Messages;
  className?: string;
}

const showAnimation = {
  initial: {
    opacity: 0,
    x: -100,
  },
  animate: {
    opacity: 1,
    x: 0,
  },
};

const Log = ({ data, className }: LogProps): JSX.Element => {
  return (
    <section
      className={`${
        className && className
      } flex flex-col bg-slate-50 border-2 border-slate-100 rounded-lg`}
    >
      <div className='flex flex-col rounded-lg overflow-y-auto overflow-x-hidden h-96'>
        <AnimatePresence initial={false}>
          {data.map(({ message, icon }, i) => {
            return (
              <motion.div
                key={`message-${data.length - i}`}
                variants={showAnimation}
                initial={'initial'}
                animate={'animate'}
              >
                <Message message={message} icon={icon} />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Log;
