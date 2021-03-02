import React, { useEffect, useState } from 'react';
import { HashRouter } from 'react-router-dom';
import Routes from './routers';
import './app.scss';

const QRCode = require('qrcode.react');

const App: React.FC = () => {
  const [phone, setPhone] = useState(true);

  useEffect(() => {
    if (!window.navigator) {
      console.log('当前设备：移动端APP');
    } else {
      if (/Mobile|Android|webOS|iPhone|Phone/i.test(navigator.userAgent)) {
        console.log('当前设备：移动端H5');
      } else {
        setPhone(false);
      }
    }
  }, []);
  return phone ? (
    <HashRouter>
      <Routes />
    </HashRouter>
  ) : (
    <div className="code">
      <QRCode
        value={`https://weixin.bingyan-tech.hustonline.net/recruit/`}
        size={250}
      />
      <div>请使用手机扫描二维码以获得更好的体验</div>
    </div>
  );
};
export default App;
