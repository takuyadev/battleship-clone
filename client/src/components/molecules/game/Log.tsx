import { Message } from '@components/atoms/text/Message';
import { Messages } from '@models/types.common';
import { AnimatePresence } from 'framer-motion';

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
      <div className='flex flex-col rounded-lg overflow-y-auto overflow-x-hidden h-96'>
        <AnimatePresence initial={false}>
          {data.map(({ message, icon }, i) => (
            <Message
              key={`message-${data.length - i}`}
              message={message}
              icon={icon}
            />
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Log;
