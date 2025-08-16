import { useNamespace } from '@ibiz-template/vue3-util';
import { defineComponent } from 'vue';
import { createUUID } from 'qx-util';
import { PanelVideoPlayerController } from './panel-video-player.controller';
import './panel-video-player.scss';

export const PanelVideoPlayer = defineComponent({
  name: 'IBizPanelVideoPlayer',
  props: {
    controller: {
      type: PanelVideoPlayerController,
      required: true,
    },
  },
  setup(props) {
    const ns = useNamespace('panel-video-player');

    const id = createUUID();
    // 路径
    const path = props.controller.getParamsValue('path');
    // 自动播放
    const autoplay = props.controller.getParamsValue('autoplay') === '1';
    // 显示控制栏
    const showcontrols =
      props.controller.getParamsValue('showcontrols') === '1';
    // 循环播放
    const replay = props.controller.getParamsValue('replay') === '1';
    // 静音
    const mute = props.controller.getParamsValue('mute') === '1';

    return {
      ns,
      id,
      path,
      autoplay,
      showcontrols,
      replay,
      mute,
    };
  },
  render() {
    return (
      <div class={this.ns.b()}>
        <div class={this.ns.e('video')}>
          <video
            {...this.controller.rawItemParams}
            id={this.id}
            src={this.path}
            autoplay={this.autoplay}
            controls={this.showcontrols}
            loop={this.replay}
            muted={this.mute}
          >
            <source src={this.path} type='video/mp4' />
            <source src={this.path} type='video/ogg' />
            <source src={this.path} type='video/webm' />
            {ibiz.i18n.t('panelComponent.panelVideoPlayer.noSupportPrompt')}
          </video>
        </div>
      </div>
    );
  },
});
export default PanelVideoPlayer;
