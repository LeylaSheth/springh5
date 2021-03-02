const images = require.context(
  '../../assets/imgs',
  true,
  /\.(png|jpg|jpeg|gif)$/
);

console.log(images.keys);

// 优化后
images.keys().reduce(
  (cachePromise, path) =>
    cachePromise.then(() => {
      return new Promise((resolve) => {
        const image = new Image();
        const complete = () => {
          clearTimeout(timer);
          resolve();
        };
        const timer = setTimeout(complete, 1000); // 单张图片最多加载1s
        image.src = images(path);
        image.onload = image.onerror = complete;
      });
    }),
  Promise.resolve()
);
export {};
