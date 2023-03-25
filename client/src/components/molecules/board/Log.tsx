import { Message } from '@components/atoms/text/Message';

export interface LogProps {
  data: string[];
}

const Log = ({ data }: LogProps): JSX.Element => {
  return (
    <section className='flex flex-col'>
      <header className='text-center'>
        <p className='text-xl font-bold m-4'>Log</p>
      </header>
      <div className='flex flex-col gap-4'>
        {data.map((message) => (
          <Message>{message}</Message>
        ))}
      </div>
    </section>
  );
};

export default Log;
