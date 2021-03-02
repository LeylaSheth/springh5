import React, { FC, useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Next from '../../components/next';
import Pause from '../../components/pause';
import them from '../../assets/imgs/them.png';
import logo from '../../assets/imgs/logo.png';
import yonghu from '../../assets/imgs/yonghu.png';

interface OnlineProps {}

const ms = 1000;

const Online: FC<OnlineProps> = (props) => {
  const history = useHistory();
  const [pause, setPause] = useState(false);
  // 记录当前进程
  const [flag, setFlag] = useState(0);
  const [show, setShow] = useState(false);
  const [change, setChange] = useState(true);

  const [showTexts, setShowTexts] = useState<string[]>([]);

  const handleTexts = () =>
    setTimeout(() => {
      const texts = ['有用！', '有趣！', '养眼！'];
      setShowTexts(texts);
      setShow(true);
      setChange(false);
      setFlag(1);
    }, ms);

  const handleNext = useCallback(
    () => [setTimeout(() => history.push('hotspot'), 2 * ms)],
    [history]
  );

  useEffect(() => {
    const textTimer = handleTexts();
    return () => {
      clearTimeout(textTimer);
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

  const comments = showTexts.map((text, index) => (
    <CSSTransition
      in={show}
      timeout={500}
      classNames={'comment' + index}
      key={index}
    >
      <div className="comment">
        <span>{text}</span>
      </div>
    </CSSTransition>
  ));

  return (
    <div className="bg10">
      <CSSTransition
        in={change}
        timeout={500}
        classNames="chan"
        unmountOnExit
        key="chan"
      >
        <div className="title">产品上线啦！</div>
      </CSSTransition>

      <TransitionGroup>{comments}</TransitionGroup>
      <CSSTransition
        in={show}
        timeout={500}
        classNames="yonghu"
        unmountOnExit
        key="yonghu"
      >
        <img src={yonghu} className="yonghu" alt="yonghu" />
      </CSSTransition>

      <img src={logo} className="logo" alt="logo" />
      <img src={them} className="them" alt="them" />
      <Pause pause={pause} controlPause={() => setPause(!pause)} />
      <Next router="/hotspot" />
    </div>
  );
};

export default Online;
