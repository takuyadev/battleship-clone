import { Message } from '@components/atoms/text/Message';
import { Messages } from '@models/types.common';

export interface LogProps {
  data: Messages;
}

const Log = ({ data }: LogProps): JSX.Element => {
  return (
    <section className='flex flex-col bg-slate-50 border-2 border-slate-100 rounded-lg'>
      <div className='flex flex-col rounded-lg overflow-auto h-96'>
        {data.map(({ message, icon }) => (
          <Message message={message} icon={icon} />
        ))}
      </div>
    </section>
  );
};

export default Log;
