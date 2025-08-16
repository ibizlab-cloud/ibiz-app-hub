import { computed, defineComponent } from 'vue';
import {
  getEditorEmits,
  getUploadProps,
  useNamespace,
} from '@ibiz-template/vue3-util';
import './ibiz-carousel.scss';
import { toNumber } from 'lodash-es';
import { useVanUpload } from '../use/use-van-upload';
import { UploadEditorController } from '../upload-editor.controller';

export const IBizEditorCarousel = defineComponent({
  name: 'IBizEditorCarousel',
  props: getUploadProps<UploadEditorController>(),
  emits: getEditorEmits(),
  setup(props, { emit }) {
    const ns = useNamespace('carousel');
    const c = props.controller;

    const { files } = useVanUpload(
      props,
      value => {
        emit('change', value);
      },
      c,
    );
    const editorModel = c.model;
    // 轮播间隔
    let autoplay = 3000;
    // 动画时长
    let duration = 500;
    // 是否显示指示器
    let showIndicators = true;
    // 是否可以通过手势滑动
    let touchable = true;
    if (editorModel.editorParams) {
      if (editorModel.editorParams.autoplay) {
        autoplay = toNumber(editorModel.editorParams.autoplay);
      }
      if (editorModel.editorParams.duration) {
        duration = toNumber(editorModel.editorParams.duration);
      }
      if (editorModel.editorParams.showIndicators) {
        showIndicators = editorModel.editorParams.showIndicators === 'true';
      }
      if (editorModel.editorParams.touchable) {
        touchable = editorModel.editorParams.touchable === 'true';
      }
    }

    const images = computed(() => {
      return files.value.map(item => {
        return { rawContent: item.url };
      });
    });

    return {
      ns,
      c,
      images,
      autoplay,
      duration,
      showIndicators,
      touchable,
    };
  },
  render() {
    return (
      <div
        class={[
          this.ns.b(),
          this.disabled ? this.ns.m('disabled') : '',
          this.readonly ? this.ns.m('readonly') : '',
        ]}
      >
        <iBizCarousel
          images={this.images}
          autoplay={this.autoplay}
          duration={this.duration}
          showIndicators={this.showIndicators}
          touchable={this.touchable}
          attrs={this.$attrs}
        ></iBizCarousel>
      </div>
    );
  },
});
