import React, { FC, useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import Next from '../../components/next';
import Pause from '../../components/pause';
import man from '../../assets/imgs/man.png';
import biao from '../../assets/imgs/biao.png';
import rili from '../../assets/imgs/rili.png';

interface StayUpProps {}
const ms = 1000;
const StayUp: FC<StayUpProps> = (props) => {
  const history = useHistory();
  const [pause, setPause] = useState(false);
  // 记录当前进程
  const [flag, setFlag] = useState(0);
  const [idea, setIdea] = useState(false);
  const [slide, setSlide] = useState(false);
  const [form, setForm] = useState(false);

  const handleForm = () =>
    setTimeout(() => {
      setForm(true);
      setFlag(1);
    }, 4 * ms);
  const handleIdea = useCallback(
    () =>
      setTimeout(() => {
        setIdea(true);
        setFlag(2);
      }, 2 * ms),
    []
  );
  const handleSlide = useCallback(
    () =>
      setTimeout(() => {
        setForm(false);
        setSlide(true);
        setFlag(3);
      }, 3 * ms),
    []
  );
  const handleRouter = useCallback(() => {
    const ideaTimer = setTimeout(() => {
      setIdea(true);
    }, 2 * ms);
    const routerTimer = setTimeout(() => {
      history.push('design');
    }, 3 * ms);
    return [ideaTimer, routerTimer];
  }, [history]);

  useEffect(() => {
    const formTimer = handleForm();
    return () => {
      clearTimeout(formTimer);
    };
  }, []);

  useEffect(() => {
    let timers: NodeJS.Timeout[];
    if (!pause) {
      switch (flag) {
        case 1:
          timers = [handleIdea()];
          break;
        case 2:
          timers = [handleSlide()];
          break;
        case 3:
          timers = handleRouter();
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
  }, [flag, pause, handleIdea, handleSlide, handleRouter]);

  return (
    <div className="bg3">
      <img src={man} alt="man" className="man" />
      <div className="idea"></div>
      <div className="title">
        对产品，设计，开发，运营
        <br />
        工作进度的详细安排
      </div>
      <CSSTransition
        in={form}
        timeout={200}
        classNames="fly"
        unmountOnExit={true}
      >
        <img src={biao} alt="biao" className="biao" />
      </CSSTransition>
      <CSSTransition
        in={idea}
        timeout={200}
        classNames="flyidea"
        unmountOnExit={true}
      >
        <div className="idea1" />
      </CSSTransition>
      <CSSTransition
        in={slide}
        timeout={200}
        classNames="fly"
        unmountOnExit={true}
      >
        <div>
          <img src={rili} alt="rili" className="rili" />
          <div className="chan">产品上线</div>
        </div>
      </CSSTransition>

      <Pause pause={pause} controlPause={() => setPause(!pause)} />
      <Next router="/design" />
    </div>
  );
};

export default StayUp;
