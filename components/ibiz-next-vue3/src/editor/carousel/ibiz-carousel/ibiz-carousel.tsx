/* eslint-disable no-nested-ternary */
import { Ref, defineComponent, ref, watch } from 'vue';
import {
  getEditorProps,
  getEditorEmits,
  useNamespace,
} from '@ibiz-template/vue3-util';
import './ibiz-carousel.scss';

import { CarouselEditorController } from '../carousel-editor.controller';

/**
 * 轮播图
 * @description 在有限空间内，循环播放图片内容。此为平台预置标准编辑器组件
 * @primary
 * @ignoreprops autoFocus | overflowMode | controlParams
 * @ignoreemits change | blur | focus | enter | infoTextChange
 */
export const IBizCarousel = defineComponent({
  name: 'IBizCarousel',
  props: getEditorProps<CarouselEditorController>(),
  emits: getEditorEmits(),
  setup(props) {
    const ns = useNamespace('carousel');
    const c = props.controller;

    const editorModel = c!.model;

    const carouselData: Ref<
      {
        id: string;
        name: string;
        imgUrl?: string;
      }[]
    > = ref([]);

    const isAuto = ref(true);

    const timeSpan = ref(3000);

    // 下载文件路径
    const downloadUrl: Ref<string> = ref('');

    // 值响应式变更
    // json: [{id:string ,name:string },{id:string ,name:string }]
    watch(
      () => props.value,
      newVal => {
        if (typeof newVal === 'string') {
          carouselData.value = !newVal ? [] : JSON.parse(newVal);
        }
      },
      { immediate: true },
    );

    // data响应式变更基础路径
    watch(
      () => props.data,
      newVal => {
        if (newVal) {
          const urls = ibiz.util.file.calcFileUpDownUrl(
            c.context,
            c.params,
            newVal,
            c.editorParams,
          );
          downloadUrl.value = urls.downloadUrl;
        }
      },
      { immediate: true, deep: true },
    );

    watch(
      carouselData,
      newVal => {
        // 变更后且下载基础路径存在时解析
        if (newVal?.length && downloadUrl.value) {
          newVal.forEach((carousel: IData) => {
            carousel.imgUrl =
              carousel.imgUrl ||
              downloadUrl.value.replace('%fileId%', carousel.id);
          });
        }
      },
      { immediate: true },
    );

    return {
      ns,
      c,
      editorModel,
      downloadUrl,
      carouselData,
      isAuto,
      timeSpan,
    };
  },
  render() {
    return (
      <div
        class={[
          this.ns.b(),
          this.disabled ? this.ns.m('disabled') : '',
          this.readonly ? this.ns.m('readonly') : '',
          this.ns.e(this.editorModel.editorType),
        ]}
      >
        <iBizCarouselComponent
          carouselData={this.carouselData}
          isAuto={this.isAuto}
          timeSpan={this.timeSpan}
          {...this.$attrs}
        />
      </div>
    );
  },
});
