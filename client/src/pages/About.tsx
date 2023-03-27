import { useState } from 'react';
import Timer from '@components/molecules/game/Timer';
const About = () => {
  const [seconds, setSeconds] = useState(0);
  const [show, setShow] = useState(false);
  return (
    <div>
      <button
        onClick={() => {
          setSeconds(5);
          setShow(true);
        }}
      >
        asdas
      </button>
      {show && <Timer setShow={setShow} seconds={seconds} />}
    </div>
  );
};

export default About;
