import {
  Idea,
  Load,
  Discuss,
  StayUp,
  Design,
  Back,
  Again,
  Battle,
  Blood,
  Program,
  Online,
  Hotspot,
  Dance,
  Article,
  Celebrate,
  End,
} from './pages';
import { FC } from 'react';
import { routerPath } from './components/next/next';

export type AnimationEnter = 'from-left' | 'from-right' | 'from-re-left';
export type AnimationExit = 'to-left' | 'to-right' | 'to-exit';

export type SceneConfig = {
  enter: AnimationEnter;
  exit: AnimationExit;
};

interface RouterConfig {
  path: routerPath;
  component: FC;
  sceneConfig: SceneConfig;
}

const router = (
  path: routerPath,
  component: FC,
  enter: AnimationEnter,
  exit: AnimationExit
): RouterConfig => ({
  path,
  component,
  sceneConfig: {
    enter,
    exit,
  },
});

const RoutersConfig: RouterConfig[] = [
  router('/', Load, 'from-left', 'to-right'),
  router('/idea', Idea, 'from-left', 'to-right'),
  router('/discuss', Discuss, 'from-left', 'to-right'),
  router('/stayup', StayUp, 'from-left', 'to-right'),
  router('/design', Design, 'from-left', 'to-right'),
  router('/back', Back, 'from-left', 'to-right'),
  router('/again', Again, 'from-re-left', 'to-right'),
  router('/battle', Battle, 'from-left', 'to-right'),
  router('/blood', Blood, 'from-left', 'to-right'),
  router('/program', Program, 'from-left', 'to-right'),
  router('/online', Online, 'from-left', 'to-right'),
  router('/hotspot', Hotspot, 'from-left', 'to-right'),
  router('/dance', Dance, 'from-left', 'to-right'),
  router('/article', Article, 'from-left', 'to-right'),
  router('/celebrate', Celebrate, 'from-left', 'to-right'),
  router('/end', End, 'from-left', 'to-right'),
];

export default RoutersConfig;
