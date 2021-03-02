import React, { FC, useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Next from '../../components/next';
import Pause from '../../components/pause';
import soft from '../../assets/imgs/soft.png';
import yuan from '../../assets/imgs/yuan.png';
import turn from '../../assets/imgs/turn.png';
import ui1 from '../../assets/imgs/ui1.png';

interface DesignProps {}

const ms = 1000;

const Design: FC<DesignProps> = (props) => {
  const history = useHistory();
  const [pause, setPause] = useState(false);
  // 记录当前进程
  const [flag, setFlag] = useState(0);
  const [change, setChange] = useState(false);

  const handleChange = useCallback(() => {
    const changeTimer = setTimeout(() => {
      setChange(true);
    }, 500);
    const routerTimer = setTimeout(() => history.push('back'), 2 * ms);
    return [changeTimer, routerTimer];
  }, [history]);

  useEffect(() => {
    const changeTimer = setTimeout(() => {
      setFlag(1);
    }, 4 * ms);
    return () => {
      clearTimeout(changeTimer);
    };
  }, []);

  useEffect(() => {
    let timers: NodeJS.Timeout[];
    if (!pause) {
      switch (flag) {
        case 1:
          timers = handleChange();
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
  }, [flag, pause, handleChange]);

  return (
    <div className="bg4">
      <div
        className="idea"
        style={
          change
            ? { animation: 'fly4 500ms ease-in forwards' }
            : { animation: 'fly3 2s ease-in forwards' }
        }
      ></div>
      <img
        src={soft}
        alt="soft"
        className="soft"
        style={
          change
            ? {
                animation: 'softleave 1000ms ease-in forwards',
              }
            : { animation: 'softenter 500ms ease-in 2.5s forwards' }
        }
      />
      <img
        src={yuan}
        alt="yuan"
        className="yuan"
        style={
          change
            ? {
                animation: 'yuanleave 1000ms ease-in forwards',
              }
            : { animation: 'yuanenter 500ms ease-in 2.5s forwards' }
        }
      />
      <img
        src={turn}
        alt="turn1"
        className="turn1"
        style={
          change
            ? {
                animation: 'turnexit 300ms ease-in forwards',
              }
            : { animation: 'turnenter 2000ms ease-in 2s forwards' }
        }
      />
      <img
        src={turn}
        alt="turn2"
        className="turn2"
        style={
          change
            ? {
                animation: 'turnexit 300ms ease-in forwards',
              }
            : { animation: 'turnenter 2000ms ease-in 2s forwards' }
        }
      />
      <img
        src={ui1}
        alt="ui1"
        className="ui1"
        style={
          change
            ? {
                animation: 'uishow 3000ms ease-in forwards',
              }
            : {}
        }
      />
      <Pause pause={pause} controlPause={() => setPause(!pause)} />
      <Next router="/back" />
    </div>
  );
};

export default Design;
