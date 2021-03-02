import React, { FC, useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Next from '../../components/next';
import Pause from '../../components/pause';
import blood from '../../assets/imgs/blood.png';

interface BloodProps {}

const ms = 1000;

const Blood: FC<BloodProps> = (props) => {
  const history = useHistory();
  const [pause, setPause] = useState(false);
  // 记录当前进程
  const [flag, setFlag] = useState(0);

  const handleNext = useCallback(
    () => [setTimeout(() => history.push('program'), ms)],
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
    <div className="bg8">
      <div className="title">
        杀死程序猿不需要
        <span role="img" aria-label="gun">
          🔫
        </span>
        <br />
        只需要改三次需求
      </div>
      <img src={blood} className="blood" alt="blood" />

      <Pause pause={pause} controlPause={() => setPause(!pause)} />
      <Next router="/program" />
    </div>
  );
};

export default Blood;
