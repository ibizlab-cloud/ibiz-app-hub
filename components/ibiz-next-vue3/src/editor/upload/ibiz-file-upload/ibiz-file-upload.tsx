import { computed, defineComponent } from 'vue';
import {
  useNamespace,
  getEditorEmits,
  getUploadProps,
  useFocusAndBlur,
  useAutoFocusBlur,
} from '@ibiz-template/vue3-util';
import { useIViewUpload } from '../use/use-iview-upload';
import { UploadEditorController } from '../upload-editor.controller';
import './ibiz-file-upload.scss';

/**
 * 文件上传
 *
 * @description 使用el-upload组件封装，用于点击上传文件。支持编辑器类型包含：`文件控件`、`文件控件（单项）`
 * @primary
 * @editorparams {"name":"isdrag","parameterType":"boolean","defaultvalue":false,"description":"el-upload组件的drag属性"}
 * @editorparams {"name":"multiple","parameterType":"boolean","defaultvalue":true,"description":"el-upload组件的multiple属性，类型为文件控件（单项）时默认值为false"}
 * @editorparams {"name":"accept","parameterType":"string","description":"el-upload组件的accept属性"}
 * @editorparams {"name":"uploadparams","parameterType":"string","description":"上传参数，图片或文件上传时，用于计算上传路径"}
 * @editorparams {"name":"exportparams","parameterType":"string","description":"下载参数，图片或文件下载时，用于计算下载路径"}
 * @editorparams {"name":"osscat","parameterType":"string","description":"用于计算上传和下载路径的OSS参数"}
 * @editorparams {"name":"readonly","parameterType":"boolean","defaultvalue":false,"description":"设置编辑器是否为只读态"}
 * @ignoreprops autoFocus | overflowMode
 * @ignoreemits blur | focus | enter | infoTextChange
 */
export const IBizFileUpload = defineComponent({
  name: 'IBizFileUpload',
  props: getUploadProps<UploadEditorController>(),
  emits: getEditorEmits(),
  setup(props, { emit }) {
    const ns = useNamespace('file-upload');
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

    // 不显示上传图标
    const noUploadIcon = computed(() => {
      return limit.value === 1 && files.value?.length === 1;
    });

    // 是否是表格列编辑器
    const isGridEditor = computed(() => {
      return !!(c.parent as IData).model.columnType;
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
      uploadUrl,
      headers,
      files,
      limit,
      noUploadIcon,
      onDownload,
      onError,
      onRemove,
      onSuccess,
      beforeUpload,
      isGridEditor,
      componentRef,
      showFormDefaultContent,
    };
  },
  render() {
    return (
      <div
        class={[
          this.ns.b(),
          this.disabled ? this.ns.m('disabled') : '',
          this.readonly ? this.ns.m('readonly') : '',
          this.ns.is('show-default', this.showFormDefaultContent),
        ]}
        ref='componentRef'
      >
        <el-upload
          class={[this.ns.b('icon'), this.ns.is('not-show', this.noUploadIcon)]}
          file-list={this.files}
          action={this.uploadUrl}
          headers={this.headers}
          disabled={this.disabled || this.readonly}
          multiple={this.c.multiple}
          limit={this.limit}
          drag={!!this.c.isDrag}
          accept={this.c.accept}
          before-upload={this.beforeUpload}
          onSuccess={this.onSuccess}
          onError={this.onError}
          onRemove={this.onRemove}
          onPreview={this.onDownload}
          {...this.$attrs}
        >
          {this.noUploadIcon ? null : (
            <el-button
              class={[this.ns.b('button')]}
              size={this.isGridEditor ? 'small' : 'default'}
            >
              {ibiz.i18n.t('editor.upload.uploadFiles')}
            </el-button>
          )}
        </el-upload>
      </div>
    );
  },
});
