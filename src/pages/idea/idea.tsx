import React, { FC, useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Next from '../../components/next';
import Pause from '../../components/pause';
import useControl from '../../hooks/useControl';

interface IdeaProps {}

const ms = 1000;

const Idea: FC<IdeaProps> = (props) => {
  const history = useHistory();
  const [pause, setPause] = useState(false);
  // 记录当前进程
  const [flag, setFlag] = useState(0);
  //
  const [idea, setIdea] = useState(false);

  const [showTexts, setShowTexts] = useState<string[]>([]);

  const handleClouds = () => {
    const texts = [
      '“公选课选课指南”',
      '“校园需求”',
      '“高效收作业”',
      '“闲置品交易”',
    ];
    const cloudTimers = texts.map((text, i) =>
      setTimeout(() => {
        setShowTexts((showTexts) => [...showTexts, text]);
        if (i === texts.length - 1) {
          setFlag(flag + 1);
        }
      }, i * ms)
    );
    return cloudTimers;
  };

  const handleIdeaEnter = useCallback(() => {
    let delay = 0;
    const cloudExitTimer = setTimeout(() => {
      setShowTexts([]);
    }, ++delay * ms);

    const ideaEnterTimer = setTimeout(() => {
      setIdea(true);
      setFlag((flag) => flag + 1);
    }, ++delay * ms);

    return [cloudExitTimer, ideaEnterTimer];
  }, []);

  const handleIdeaExit = useCallback(() => {
    let delay = 0;
    const ideaExitTimer = setTimeout(() => {
      setIdea(false);
      history.push('/discuss');
      setFlag(flag + 1);
    }, ++delay * ms);

    return [ideaExitTimer];
  }, [history]);

  useControl(pause, [handleClouds, handleIdeaEnter, handleIdeaExit], flag);

  const clouds = showTexts.map((showText, index) => (
    <CSSTransition
      in={true}
      timeout={500}
      classNames={'show' + index}
      key={index}
    >
      <div className="thoughts">
        <span>{showText}</span>
      </div>
    </CSSTransition>
  ));

  return (
    <div className="idea-page">
      <TransitionGroup>{clouds}</TransitionGroup>
      <CSSTransition
        in={idea}
        timeout={500}
        classNames="idea"
        unmountOnExit
        key="idea"
      >
        <div className="idea" />
      </CSSTransition>
      <Pause pause={pause} controlPause={() => setPause(!pause)} />
      <Next router="/discuss" />
    </div>
  );
};

export default Idea;
