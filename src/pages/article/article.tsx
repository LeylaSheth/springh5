import React, { FC, useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Next from '../../components/next';
import Pause from '../../components/pause';
import iknow1 from '../../assets/imgs/iknow1.jpg';
import iknow2 from '../../assets/imgs/iknow2.jpg';
import iknow3 from '../../assets/imgs/iknow3.jpg';

interface ArticleProps {}

const ms = 1000;

const Article: FC<ArticleProps> = (props) => {
  const history = useHistory();
  const [pause, setPause] = useState(false);
  // 记录当前进程
  const [flag, setFlag] = useState(0);
  const [imgs, setImgs] = useState<string[]>([]);

  const handleImgs = () => {
    const imgs = [iknow1, iknow2, iknow3];
    const imgsTimers = imgs.map((img, i) =>
      setTimeout(() => {
        setImgs((imgs) => [...imgs, img]);
        if (i === imgs.length - 1) {
          setFlag(1);
        }
      }, i * ms)
    );
    return imgsTimers;
  };
  const handleNext = useCallback(
    () => [setTimeout(() => history.push('celebrate'), 1.5 * ms)],
    [history]
  );

  useEffect(() => {
    const imgsTimers = handleImgs();
    return () => {
      imgsTimers.forEach((timer) => clearTimeout(timer));
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

  const showImgs = imgs.map((img, index) => {
    return (
      <CSSTransition
        in={true}
        timeout={500}
        classNames={`iknow${index}`}
        key={index}
      >
        <img
          src={img}
          alt={`iknow${index + 1}`}
          className={`iknow${index + 1}`}
        />
      </CSSTransition>
    );
  });
  return (
    <div className="bg13">
      <TransitionGroup>{showImgs}</TransitionGroup>
      <Pause pause={pause} controlPause={() => setPause(!pause)} />
      <Next router="/celebrate" />
    </div>
  );
};

export default Article;
