/* eslint-disable no-param-reassign */
import { computed, defineComponent, ref } from 'vue';
import {
  getEditorEmits,
  getUploadProps,
  useFocusAndBlur,
  useNamespace,
  useAutoFocusBlur,
} from '@ibiz-template/vue3-util';
import './ibiz-image-upload.scss';
import { useIViewUpload } from '../use/use-iview-upload';
import { UploadEditorController } from '../upload-editor.controller';

/**
 * 图片上传
 *
 * @description 使用el-upload，el-image-viewer组件封装，用于图片上传，上传后的图片会以卡片形式展示。支持编辑器类型包含：`图片控件`、`图片控件（单项）`
 * @primary
 * @editorparams {"name":"multiple","parameterType":"boolean","defaultvalue":true,"description":"el-upload组件的multiple属性，类型为图片控件（单项）时默认值为false"}
 * @editorparams {"name":"accept","parameterType":"string","description":"el-upload组件的accept属性"}
 * @editorparams {"name":"autopreview","parameterType":"boolean","defaultvalue":false,"description":"当输入参数 `readonly` 为 true 并且该参数为 true 时。加载完图片后将自动调整图片大小达到预览态，且鼠标移入后不显示图片处理工具栏"}
 * @editorparams {"name":"uploadparams","parameterType":"string","description":"上传参数，图片上传时，用于计算上传路径"}
 * @editorparams {"name":"exportparams","parameterType":"string","description":"下载参数，图片下载时，用于计算下载路径"}
 * @editorparams {"name":"osscat","parameterType":"string","description":"用于计算上传和下载路径的OSS参数"}
 * @editorparams {"name":"readonly","parameterType":"boolean","defaultvalue":false,"description":"设置编辑器是否为只读态"}
 * @ignoreprops autoFocus | overflowMode
 * @ignoreemits blur | focus | enter | infoTextChange
 */
export const IBizImageUpload = defineComponent({
  name: 'IBizImageUpload',
  props: getUploadProps<UploadEditorController>(),
  emits: getEditorEmits(),
  setup(props, { emit }) {
    const ns = useNamespace('image-upload');

    const c = props.controller;

    const { useInFocusAndBlur, useInValueChange } = useAutoFocusBlur(
      props,
      emit,
    );

    const {
      uploadUrl,
      headers,
      files,
      limit,
      onDownload,
      onError,
      onRemove,
      onSuccess,
      beforeUpload,
    } = useIViewUpload(
      props,
      value => {
        emit('change', value);
        useInValueChange();
      },
      c,
    );

    const dialogImageUrl = ref<string[]>([]);
    const dialogImageUrlIndex = ref<number>(0);
    const dialogVisible = ref<boolean>(false);

    const onDialogVisibleChange = (value: boolean) => {
      dialogVisible.value = value;
    };

    // 预览
    const onPreview = (file: IData) => {
      dialogImageUrl.value = [];
      files.value.forEach(i => {
        if (i.base64) {
          (dialogImageUrl.value as string[]).push(i.base64);
        } else if (i.url) {
          (dialogImageUrl.value as string[]).push(i.url);
        }
      });
      dialogImageUrlIndex.value = files.value.findIndex(
        item => item.url === file.url,
      );
      dialogVisible.value = true;
    };

    // 不显示上传图标
    const noUploadIcon = computed(() => {
      return limit.value === 1 && files.value.length === 1;
    });

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

    // 聚焦失焦事件
    const { componentRef } = useFocusAndBlur(
      () => emit('focus'),
      () => useInFocusAndBlur(),
    );

    return {
      ns,
      c,
      files,
      limit,
      headers,
      uploadUrl,
      dialogImageUrl,
      dialogVisible,
      noUploadIcon,
      beforeUpload,
      onSuccess,
      onError,
      onRemove,
      onDownload,
      onDialogVisibleChange,
      onPreview,
      componentRef,
      showFormDefaultContent,
      dialogImageUrlIndex,
    };
  },
  render() {
    // 编辑态展示
    return (
      <div
        class={[
          this.ns.b(),
          this.disabled ? this.ns.m('disabled') : '',
          this.readonly ? this.ns.m('readonly') : '',
          this.readonly && this.c.autoPreview && this.ns.m('autosize'),
          this.ns.is('show-default', this.showFormDefaultContent),
        ]}
        ref='componentRef'
      >
        <div class={this.ns.e('image-upload-list')}>
          {this.files.map(item => (
            <div key={item.id} class={this.ns.e('list-item')}>
              <img src={item.base64 ? item.base64 : item.url} />
              <div class={this.ns.e('list-item-cover')}>
                <ion-icon
                  class={this.ns.e('preview-icon')}
                  onClick={() => this.onPreview(item)}
                  name='search'
                ></ion-icon>
                <ion-icon
                  class={this.ns.e('download-icon')}
                  onClick={() => this.onDownload(item)}
                  name='download'
                ></ion-icon>
                <ion-icon
                  class={this.ns.e('remove-icon')}
                  onClick={() => this.onRemove(item)}
                  name='remove'
                ></ion-icon>
              </div>
            </div>
          ))}
        </div>
        <el-upload
          ref='imageUpload'
          class={[this.ns.b('icon'), this.ns.is('not-show', this.noUploadIcon)]}
          file-list={this.files}
          action={this.uploadUrl}
          headers={this.headers}
          disabled={this.disabled}
          multiple={this.c.multiple}
          limit={this.limit}
          show-file-list={false}
          accept={this.c.accept}
          list-type={'picture-card'}
          before-upload={this.beforeUpload}
          onSuccess={this.onSuccess}
          onError={this.onError}
          onRemove={this.onRemove}
          onPreview={this.onDownload}
          {...this.$attrs}
        >
          <ion-icon
            name='add-outline'
            class={this.ns.e('image-upload-add')}
          ></ion-icon>
        </el-upload>
        {this.dialogVisible ? (
          <el-image-viewer
            onClose={() => this.onDialogVisibleChange(false)}
            url-list={this.dialogImageUrl}
            hide-on-click-modal={true}
            close-on-press-escape={true}
            teleported
            z-index={9999}
            initial-index={this.dialogImageUrlIndex}
            {...this.$attrs}
          ></el-image-viewer>
        ) : null}
      </div>
    );
  },
});
