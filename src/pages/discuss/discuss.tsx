import React, { FC, useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import say from '../../assets/imgs/say.png';
import { CSSTransition } from 'react-transition-group';
import bg from '../../assets/imgs/bg2.jpg';
import bgt from '../../assets/imgs/bgt.jpg';
import Pause from '../../components/pause';
import Next from '../../components/next';
import useControl from '../../hooks/useControl';

interface DiscussProps {}

const Discuss: FC<DiscussProps> = (props) => {
  const history = useHistory();
  const [flag, setFlag] = useState(0);
  const [pause, setPause] = useState(false);
  const [text, setText] = useState(true);
  const [change, setChange] = useState(false);

  const handleText = useCallback(() => {
    const textTimer = setTimeout(() => {
      setText(false);
    }, 2000);
    const routerTimer = setTimeout(() => {
      history.push('stayup');
    }, 3000);
    return [textTimer, routerTimer];
  }, [history]);

  const handleChange = () =>
    setTimeout(() => {
      setChange(true);
      setFlag(flag + 1);
    }, 3000);

  useControl(pause, [handleChange, handleText], flag);

  return (
    <div
      className="bg2"
      style={
        change
          ? { backgroundImage: 'url(' + bgt + ')' }
          : { backgroundImage: 'url(' + bg + ')' }
      }
    >
      <img src={say} className="say" alt="say" />
      <CSSTransition in={change} timeout={150} classNames="tie" unmountOnExit>
        <div className="tie" />
      </CSSTransition>

      <CSSTransition
        in={text}
        appear={text}
        timeout={200}
        classNames="letter"
        unmountOnExit
      >
        <div className="letter">
          每一个成型产品idea的背后
          <br />
          都是一群小伙伴的
          <s>辩论撕逼</s>
          群策群力
        </div>
      </CSSTransition>
      <CSSTransition in={!text} timeout={500} classNames="letter" unmountOnExit>
        <div className="letter">
          对产品idea进行集体评审，
          <br />
          一致通过可进入正式开发
        </div>
      </CSSTransition>

      <div className="idea"></div>
      {/* <CSSTransition in={idea} timeout={500} classNames="ideas" unmountOnExit>
        <div className="idea1"></div>
      </CSSTransition> */}

      <Pause pause={pause} controlPause={() => setPause(!pause)} />
      <Next router="/stayup" />
    </div>
  );
};

export default Discuss;
