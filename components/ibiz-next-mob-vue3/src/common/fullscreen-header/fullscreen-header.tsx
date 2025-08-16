import { useNamespace } from '@ibiz-template/vue3-util';
import { defineComponent } from 'vue';
import './fullscreen-header.scss';

export const IBizFullscreenHeader = defineComponent({
  name: 'IBizFullscreenHeader',
  props: {
    title: {
      type: String,
    },
  },
  setup() {
    const ns = useNamespace('fullscreen-header');
    const onClose = () => {
      ibiz.fullscreenUtil.closeElementFullscreen();
    };
    return { ns, onClose };
  },
  render() {
    return (
      <div class={this.ns.b()}>
        <span class={this.ns.e('title')}>{this.title}</span>
        <span class={this.ns.e('close')} onClick={this.onClose}>
          <ion-icon name='close-outline'></ion-icon>
        </span>
      </div>
    );
  },
});
