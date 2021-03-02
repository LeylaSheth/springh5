import React, { FC, useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Next from '../../components/next';
import Pause from '../../components/pause';
import laba from '../../assets/imgs/laba.png';
import ui2 from '../../assets/imgs/ui2.png';

interface AgainProps {}

const ms = 1000;

const Again: FC<AgainProps> = (props) => {
  const history = useHistory();
  const [pause, setPause] = useState(false);
  // 记录当前进程
  const [flag, setFlag] = useState(0);
  const [fly, setFly] = useState(false);
  const handleFly = useCallback(() => {
    setFly(true);
    return [setTimeout(() => history.push('battle'), 2.5 * ms)];
  }, [history]);

  useEffect(() => {
    const flyTimer = setTimeout(() => {
      setFlag(1);
    }, 2 * ms);
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
    <div className="bg6">
      <div className="say">
        这不是我要的五彩斑斓的黑，
        <br />
        五颜六色的白！
      </div>
      <img src={laba} alt="laba" className="laba" />
      <img
        src={ui2}
        alt="ui2"
        className="ui2"
        style={fly ? { animation: 'uishow1 3000ms ease-in forwards' } : {}}
      />
      <Pause pause={pause} controlPause={() => setPause(!pause)} />
      <Next router="/battle" />
    </div>
  );
};

export default Again;
