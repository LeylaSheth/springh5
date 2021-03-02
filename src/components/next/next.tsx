import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';

export type routerPath =
  | '/'
  | '/idea'
  | '/discuss'
  | '/stayup'
  | '/design'
  | '/back'
  | '/again'
  | '/battle'
  | '/blood'
  | '/program'
  | '/online'
  | '/hotspot'
  | '/dance'
  | '/article'
  | '/celebrate'
  | '/end';

interface NextProps {
  router: routerPath;
}

const Next: FC<NextProps> = ({ router }) => {
  const history = useHistory();
  return (
    <div
      className="next"
      onClick={() => {
        history.push(router);
      }}
      style={{ animation: 'next 1s linear infinite' }}
    />
  );
};

export default Next;
