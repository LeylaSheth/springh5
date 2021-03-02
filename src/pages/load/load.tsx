import React, { FC, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Progress from '../../components/progress';

interface LoadProps {}

const Load: FC<LoadProps> = (props) => {
  const history = useHistory();
  const [percent, setPercent] = useState(0);
  useEffect(() => {
    const images = require.context(
      '../../assets/imgs',
      true,
      /\.(png|jpg|jpeg|gif)$/
    );

    console.log(images.keys());

    // 优化后
    images.keys().reduce(
      (cachePromise, path) =>
        cachePromise.then(() => {
          return new Promise((resolve) => {
            const image = new Image();
            const complete = () => {
              clearTimeout(timer);
              setPercent((percent) => {
                const latest = Math.ceil((percent + 100 / 60) * 100) / 100;
                return latest < 100 ? latest : 100;
              });
              resolve();
            };
            const timer = setTimeout(complete, 1000); // 单张图片最多加载1s
            image.src = images(path);
            image.onload = image.onerror = complete;
          });
        }),
      Promise.resolve()
    );
  }, []);
  return (
    <div className="load">
      <div className="title">互联网人的相爱相杀</div>

      {percent === 100 && (
        <div
          className="start"
          style={{ bottom: '15vw' }}
          onClick={() => history.push('idea')}
        />
      )}
      <Progress percent={percent} />

      <div className="text">点击开始围观</div>
    </div>
  );
};

export default Load;
