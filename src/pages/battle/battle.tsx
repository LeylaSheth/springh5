import React, { FC, useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Next from '../../components/next';
import Pause from '../../components/pause';
import ui2 from '../../assets/imgs/ui2.png';
import han from '../../assets/imgs/han.png';
import xuqiu from '../../assets/imgs/xuqiu.png';
import xuqiu2 from '../../assets/imgs/xuqiu2.png';
import man2 from '../../assets/imgs/man2.png';
import man3 from '../../assets/imgs/man3.png';

interface BattleProps {}

const ms = 1000;

const Battle: FC<BattleProps> = (props) => {
  const history = useHistory();
  const [pause, setPause] = useState(false);
  // 记录当前进程
  const [flag, setFlag] = useState(0);
  const [show, setShow] = useState(false);
  const [change, setChange] = useState(false);
  const [clock, setClock] = useState(true);

  const [showTexts, setShowTexts] = useState<string[]>([]);

  const handleChange = () =>
    setTimeout(() => {
      setChange(true);
      setClock(false);
      setFlag(1);
    }, 2 * ms);
  const handleClock = useCallback(
    () =>
      setTimeout(() => {
        setClock(true);
        setFlag(2);
      }, 2 * ms),
    []
  );

  const handleTexts = useCallback(() => {
    const textTimer = setTimeout(() => {
      const texts = [
        '这个需求做不了！',
        '这个需求很紧急！',
        '这个需求很重要！',
        '这个需求很简单！',
      ];
      setShowTexts(texts);
      setShow(true);
      setChange(false);
      setClock(false);
    }, 2 * ms);
    const routerTimer = setTimeout(() => {
      history.push('blood');
    }, 4 * ms);
    return [textTimer, routerTimer];
  }, [history]);

  useEffect(() => {
    const changeTimer = handleChange();
    return () => {
      clearTimeout(changeTimer);
    };
  }, []);

  useEffect(() => {
    let timers: NodeJS.Timeout[];
    if (!pause) {
      switch (flag) {
        case 1:
          timers = [handleClock()];
          break;
        case 2:
          timers = handleTexts();
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
  }, [flag, pause, handleClock, handleTexts]);

  const chat = showTexts.map((text, index) => {
    return (
      <CSSTransition
        in={true}
        timeout={500}
        classNames={'conver' + index}
        key={index}
      >
        <div className="conver">{text}</div>
      </CSSTransition>
    );
  });
  return (
    <div className="bg7">
      <TransitionGroup>{chat}</TransitionGroup>
      <div
        className="clock1"
        style={clock ? {} : { animation: 'circle 500ms linear' }}
      />
      <CSSTransition
        in={change}
        timeout={500}
        classNames="title"
        unmountOnExit
        key="title"
      >
        <div className="title">
          你以为的
          <br />
          产品经理和程序员的
          <br />
          相爱相杀......
        </div>
      </CSSTransition>

      <img src={ui2} className="ui2" alt="ui2" />

      <img src={xuqiu} className="xuqiu1" alt="xuqiu" />

      <CSSTransition
        in={change}
        timeout={500}
        classNames="man"
        unmountOnExit
        key="man2"
      >
        <img src={man2} className="man" alt="man2" />
      </CSSTransition>

      <CSSTransition
        in={show}
        timeout={500}
        classNames="xuqiu"
        unmountOnExit
        key="xuqiu2"
      >
        <img src={xuqiu2} className="xuqiu" alt="xuqiu2" />
      </CSSTransition>
      <CSSTransition
        in={show}
        timeout={500}
        classNames="man"
        unmountOnExit
        key="idea4"
      >
        <img src={man3} className="man" alt="man3" />
      </CSSTransition>

      <img src={han} className="han" alt="han" />

      <Pause pause={pause} controlPause={() => setPause(!pause)} />
      <Next router="/blood" />
    </div>
  );
};

export default Battle;
