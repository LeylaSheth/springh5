import React, { FC } from 'react';
import stop from '../../assets/imgs/stop.png';
import cont from '../../assets/imgs/cont.png';

interface PauseProps {
  pause: boolean;
  controlPause: () => void;
}

const Pause: FC<PauseProps> = ({ pause, controlPause }) => (
  <div
    className="start"
    style={
      pause
        ? {
            backgroundImage: 'url(' + cont + ')',
            backgroundPositionX: '60%',
          }
        : { backgroundImage: 'url(' + stop + ')' }
    }
    onClick={controlPause}
  />
);

export default Pause;
