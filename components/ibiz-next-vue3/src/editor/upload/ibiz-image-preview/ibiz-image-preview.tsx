/* eslint-disable no-param-reassign */
import { computed, defineComponent } from 'vue';
import {
  useNamespace,
  getEditorEmits,
  getUploadProps,
} from '@ibiz-template/vue3-util';
import { UploadEditorController } from '../upload-editor.controller';
import './ibiz-image-preview.scss';

/**
 * 图片预览
 *
 * @description 使用el-image组件封装，用于绘制图片内容，支持图片预览。支持编辑器类型包含：`图片控件（单项、直接内容）`
 * @primary
 * @editorparams {"name":"stoppropagation","parameterType":"boolean","defaultvalue":true,"description":"是否阻止图片默认点击事件"}
 * @ignoreprops autoFocus | overflowMode
 * @ignoreemits change | blur | focus | enter | infoTextChange
 */
export const IBizImagePreview = defineComponent({
  name: 'IBizImagePreview',
  props: getUploadProps<UploadEditorController>(),
  emits: getEditorEmits(),
  setup(props) {
    const ns = useNamespace('image-preview');

    const c = props.controller;

    // 是否阻止默认点击
    let result = c.editorParams?.STOPPROPAGATION !== 'false';
    if (c.editorParams?.stoppropagation) {
      result = c.editorParams.stoppropagation !== 'false';
    }

    // 是否显示表单默认内容
    const showFormDefaultContent = computed(() => {
      if (
        props.controlParams &&
        props.controlParams.editmode === 'hover' &&
        !props.readonly
      ) {
        return true;
      }
      return false;
    });

    // 点击事件
    const onClick = (event: MouseEvent) => {
      if (result) {
        event.stopPropagation();
      }
    };

    // 预览列表
    const previewList = computed(() => {
      if (!result) {
        return [];
      }
      return [props.value];
    });

    return {
      ns,
      c,
      showFormDefaultContent,
      previewList,
      onClick,
    };
  },
  render() {
    return (
      <div
        class={[
          this.ns.b(),
          this.ns.is('show-default', this.showFormDefaultContent),
        ]}
        onClick={this.onClick}
      >
        <el-image
          fit='contain'
          src={this.value}
          preview-src-list={this.previewList}
          {...this.$attrs}
        ></el-image>
      </div>
    );
  },
});
