/* eslint-disable no-param-reassign */
import { defineComponent, ref } from 'vue';
import {
  getEditorEmits,
  getUploadProps,
  useNamespace,
} from '@ibiz-template/vue3-util';
import './ibiz-image-select.scss';
import { showImagePreview } from 'vant';
import { UploadEditorController } from '../upload-editor.controller';
import { useVanUpload } from '../use/use-van-upload';

export const IBizImageSelect = defineComponent({
  name: 'IBizImageSelect',
  props: getUploadProps<UploadEditorController>(),
  emits: getEditorEmits(),
  setup(props, { emit }) {
    const ns = useNamespace('image-select');

    const c = props.controller;

    // 是否阻止默认点击
    const result = c.editorParams?.STOPPROPAGATION !== 'false';

    // svg图片内容
    const svg = ref('');

    const { files } = useVanUpload(
      props,
      value => {
        emit('change', value);
      },
      c,
    );

    // 预览
    const onPreview = (_file: IData) => {
      showImagePreview({
        images: files.value.map(item => item.url) as string[],
      });
    };

    // 图片点击
    const onClick = (file: IData, event: MouseEvent) => {
      if (result) {
        event.stopPropagation();
        onPreview(file);
      }
    };

    return {
      ns,
      c,
      files,
      svg,
      result,
      onPreview,
      onClick,
    };
  },
  render() {
    return (
      <div class={[this.ns.b()]}>
        <van-uploader
          modelValue={this.files}
          disabled={this.disabled}
          multiple={false}
          accept={this.c.accept}
          max-count={1}
          deletable={false}
          readonly
          preview-full-image={this.result}
          {...this.$attrs}
        >
          {{
            'preview-cover': (file: IData) => {
              return (
                <div
                  class={this.ns.b('item-cover')}
                  onClick={(event: MouseEvent) => this.onClick(file, event)}
                >
                  <img src={file.url}></img>
                </div>
              );
            },
          }}
        </van-uploader>
      </div>
    );
  },
});
