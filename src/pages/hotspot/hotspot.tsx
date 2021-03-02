import React, { FC, useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Next from '../../components/next';
import Pause from '../../components/pause';
import resou from '../../assets/imgs/resou.png';

interface HotspotProps {}

const ms = 1000;

const Hotspot: FC<HotspotProps> = (props) => {
  const history = useHistory();
  const [pause, setPause] = useState(false);
  // 记录当前进程
  const [flag, setFlag] = useState(0);

  const handleNext = useCallback(
    () => [setTimeout(() => history.push('dance'), ms)],
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
    <div className="bg11">
      <div className="title">
        运营人
        <br />
        远不止
        <br />
        “叫卖”产品...
      </div>
      <img src={resou} alt="resou" className="resou" />
      <Pause pause={pause} controlPause={() => setPause(!pause)} />
      <Next router="/dance" />
    </div>
  );
};

export default Hotspot;
