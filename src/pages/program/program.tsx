import React, { FC, useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import Next from '../../components/next';
import Pause from '../../components/pause';
import xian from '../../assets/imgs/xian.png';
import bg from '../../assets/imgs/bg9.png';
import bgu from '../../assets/imgs/bgu.png';
import logo from '../../assets/imgs/logo.png';

interface ProgramProps {}

const ms = 1000;

const Program: FC<ProgramProps> = (props) => {
  const history = useHistory();
  const [pause, setPause] = useState(false);
  // 记录当前进程
  const [flag, setFlag] = useState(0);
  const [change, setChange] = useState(false);
  const [show, setShow] = useState(false);
  const [by, setBy] = useState(true);

  const handleBy = () =>
    setTimeout(() => {
      setBy(false);
      setShow(true);
      setFlag(1);
    }, ms);

  const handleChange = useCallback(() => {
    const animationTimer = setTimeout(() => {
      setShow(false);
      setChange(true);
    }, ms);
    const routerTimer = setTimeout(() => {
      history.push('online');
    }, 3.5 * ms);
    return [animationTimer, routerTimer];
  }, [history]);

  useEffect(() => {
    const byTimer = handleBy();
    return () => {
      clearTimeout(byTimer);
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
    <div
      className="bg9"
      style={
        change
          ? { backgroundImage: 'url(' + bgu + ')' }
          : { backgroundImage: 'url(' + bg + ')' }
      }
    >
      <CSSTransition
        in={by}
        timeout={500}
        classNames="by"
        unmountOnExit
        key="by"
      >
        <div className="by">然而在冰岩大多是...</div>
      </CSSTransition>
      <CSSTransition
        in={show}
        timeout={500}
        classNames="xian"
        unmountOnExit
        key="xian"
      >
        <img src={xian} className="xian" alt="xian" />
      </CSSTransition>

      <CSSTransition
        in={show}
        timeout={500}
        classNames="xuqiu2"
        unmountOnExit
        key="xuqiu"
      >
        <div className="xuqiu">
          大哥，加个需求吧，
          <br />
          这个项目2.17号要上线哦~
        </div>
      </CSSTransition>
      <CSSTransition
        in={change}
        timeout={500}
        classNames="ans"
        unmountOnExit
        key="ans"
      >
        <div className="ans">No Problem!</div>
      </CSSTransition>
      <CSSTransition
        in={change}
        timeout={500}
        classNames="xian1"
        unmountOnExit
        key="xian1"
      >
        <img src={xian} className="xian" alt="xian1" />
      </CSSTransition>
      <img
        src={logo}
        className="logo"
        style={change ? { animation: ' logo 2000ms linear 1s forwards' } : {}}
        alt="logo"
      />
      <Pause pause={pause} controlPause={() => setPause(!pause)} />
      <Next router="/online" />
    </div>
  );
};

export default Program;
