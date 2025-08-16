import { registerPanelItemProvider } from '@ibiz-template/runtime';
import { withInstall } from '@ibiz-template/vue3-util';
import { App } from 'vue';
import PanelVideoPlayer from './panel-video-player';
import { PanelVideoPlayerProvider } from './panel-video-player.provider';

export * from './panel-video-player.provider';
export * from './panel-video-player.controller';

export const IBizPanelVideoPlayer = withInstall(
  PanelVideoPlayer,
  function (v: App) {
    v.component(PanelVideoPlayer.name, PanelVideoPlayer);
    registerPanelItemProvider(
      'RAWITEM_STATIC_VIDEOPLAYER',
      () => new PanelVideoPlayerProvider(),
    );
  },
);

export default IBizPanelVideoPlayer;
