import React, { FC, useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Next from '../../components/next';
import Pause from '../../components/pause';
import shey from '../../assets/imgs/shey.png';

interface DanceProps {}

const ms = 1000;

const Dance: FC<DanceProps> = (props) => {
  const history = useHistory();
  const [pause, setPause] = useState(false);
  // 记录当前进程
  const [flag, setFlag] = useState(0);

  const handleNext = useCallback(
    () => [setTimeout(() => history.push('article'), ms)],
    [history]
  );

  useEffect(() => {
    const nextTimer = setTimeout(() => {
      setFlag(1);
    }, 2 * ms);
    return () => {
      clearTimeout(nextTimer);
    };
  }, []);

  useEffect(() => {
    let timers: NodeJS.Timeout[];
    if (!pause) {
      switch (flag) {
        case 1:
          timers = handleNext();
          break;

        default:
          break;
      }
    }
    return () => {
      if (timers) {
        timers.forEach((time) => clearTimeout(time));
      }
    };
  }, [flag, pause, handleNext]);
  return (
    <div className="bg12">
      <div className="dance">
        Wow!
        <br />
        You can really
        <br /> dance!!!
      </div>
      <img src={shey} alt="shey" className="shey" />
      <div className="kiki"></div>
      <Pause pause={pause} controlPause={() => setPause(!pause)} />
      <Next router="/article" />
    </div>
  );
};

export default Dance;
