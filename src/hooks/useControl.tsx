import { useEffect, useState } from 'react';

function useControl(pause: boolean, fnList: Function[], flag: number) {
  const [control, setControl] = useState<Generator>();
  const [index, setIndex] = useState(0);

  const controlInit = function* () {
    for (let i = 0; i < fnList.length; i++) {
      const timeout = fnList[i]();
      yield { timeout, index: i + 1 };
    }
  };
  useEffect(() => {
    setControl(controlInit());
  }, []);
  useEffect(() => {
    let timeout: NodeJS.Timeout[] | NodeJS.Timeout;
    if (!pause && control && flag === index) {
      const info = control.next().value;
      if (info) {
        timeout = info.timout;
        setIndex(info.index);
        console.log(info);
      }
    }
    return () => {
      if (Array.isArray(timeout)) {
        timeout.forEach((item) => clearTimeout(item));
      } else {
        clearTimeout(timeout);
      }
    };
  }, [pause, control, flag]);
}

export default useControl;
