import { Messages } from "../../models/types/Game";
import { Message } from "../atoms/Message";

interface ILog {
  data: Messages;
}

const Log = ({ data }: ILog): JSX.Element => {
  return (
    <section className="flex flex-col ">
      <header className="text-center">
        <p className="text-xl font-bold m-4">Message Log</p>
      </header>
      <div className="flex flex-col gap-4 overflow-auto h-64">
        {data.map((message: string) => {
          return <Message>{message}</Message>;
        })}
      </div>
    </section>
  );
};

export { Log };
