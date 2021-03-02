import React, { FC, useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Next from '../../components/next';
import Pause from '../../components/pause';
import haibao from '../../assets/imgs/haibao.jpg';

interface CelebrateProps {}

const ms = 1000;

const Celebrate: FC<CelebrateProps> = (props) => {
  const history = useHistory();
  const [pause, setPause] = useState(false);
  // 记录当前进程
  const [flag, setFlag] = useState(0);

  const handleNext = useCallback(
    () => [setTimeout(() => history.push('end'), ms)],
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
    <div className="bg14">
      <div className="mem" />
      <img src={haibao} alt="none" style={{ display: 'none' }} />
      <div className="title">
        产品庆功盛宴
        <br />
        深夜海底捞局...
      </div>

      <Pause pause={pause} controlPause={() => setPause(!pause)} />
      <Next router="/end" />
    </div>
  );
};

export default Celebrate;
