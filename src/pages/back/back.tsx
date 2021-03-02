import React, { FC, useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Next from '../../components/next';
import Pause from '../../components/pause';
import ui1 from '../../assets/imgs/ui1.png';

interface BackProps {}

const ms = 1000;

const Back: FC<BackProps> = (props) => {
  const history = useHistory();
  const [pause, setPause] = useState(false);
  // 记录当前进程
  const [flag, setFlag] = useState(0);
  const [fly, setFly] = useState(false);
  const handleFly = useCallback(() => {
    setFly(true);
    return [setTimeout(() => history.push('again'), ms)];
  }, [history]);

  useEffect(() => {
    const flyTimer = setTimeout(() => {
      setFlag(1);
    }, 1.5 * ms);
    return () => {
      clearTimeout(flyTimer);
    };
  }, []);

  useEffect(() => {
    let timers: NodeJS.Timeout[];
    if (!pause) {
      switch (flag) {
        case 1:
          timers = handleFly();
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
  }, [flag, pause, handleFly]);
  return (
    <div className="bg5">
      <img
        src={ui1}
        className="ui1"
        alt="ui1"
        style={fly ? { animation: 'flyback 500ms ease-in forwards' } : {}}
      />
      <Pause pause={pause} controlPause={() => setPause(!pause)} />
      <Next router="/again" />
    </div>
  );
};

export default Back;
