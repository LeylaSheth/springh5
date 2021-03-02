import React, { FC } from 'react';
import bingyan from '../../assets/imgs/bingyan.png';

interface EndProps {}

const End: FC<EndProps> = (props) => (
  <div className="bg15">
    <img src={bingyan} alt="bingyan" className="bingyan" />
    <h2>冰岩——你的互联网大学</h2>
    <div className="wen">
      撕逼只是表象，
      <br />
      通力合作才是背后的灵魂。
      <br />
      过去的20年，
      <br />
      我们以产品为根基，创意为方向
      <br />
      不断创新与挑战，留下了自己的战绩：
      <br />
      单个产品浏览量达到
      <big>
        <b>380w</b>
      </big>
      ；
      <br />
      服务用户数超过
      <big>
        <b>3000w人</b>
      </big>
      ；
      <br />
      单个视频抖音播放量超
      <big>
        <b>400w</b>
      </big>
      ；
      <br />
      上线了
      <big>
        <b>100+</b>
      </big>
      个
      <br />
      贴近华科师生的互联网产品
      <br />
      未来，冰岩想邀请你
      <br />
      一起打造下一批明星产品！
    </div>
    <a className="nsignin" href="/#">
      <div>再次观看</div>
    </a>
    <a className="signin" href="https://newcvs.bingyan.net/">
      <div>报名入学</div>
    </a>
    <a
      href="http://mp.weixin.qq.com/s?__biz=MzA4ODc0MDgxNw==&mid=504759865&idx=1&sn=283513503fa583f9406e0f2a96fe0f43&chksm=0bc720873cb0a991d14429ef25a9741ccc8d1c637bb8bcd44ae688a7916f08f62eb8cf3265a3#rd"
      className="tuiwen"
    >
      进入推文查看详情
    </a>
  </div>
);

export default End;
