import { computed, defineComponent, Ref, ref, watch } from 'vue';
import {
  getEditorEmits,
  getRawProps,
  useNamespace,
} from '@ibiz-template/vue3-util';
import { RawEditorController } from '../raw-editor.controller';
import './ibiz-raw.scss';

export const IBizRaw = defineComponent({
  name: 'IBizRaw',
  props: getRawProps<RawEditorController>(),
  emits: getEditorEmits(),
  setup(props) {
    const ns = useNamespace('raw');
    const c = props.controller;
    const editorModel = c.model;

    // 传入内容
    const content: Ref<string | number | undefined> = ref('');

    // 类型
    let type = 'TEXT';
    // handlerBars模版
    let template = '';
    if (editorModel.contentType) {
      type = editorModel.contentType;
    }
    if (editorModel.editorParams && editorModel.editorParams.contenttype) {
      type = editorModel.editorParams.contenttype;
    }
    if (editorModel.editorParams && editorModel.editorParams.template) {
      template = editorModel.editorParams.template.replace(/\/\/n/g, '\n');
    }
    if (editorModel.editorParams && editorModel.editorParams.TEMPLATE) {
      template = editorModel.editorParams.TEMPLATE.replace(/\/\/n/g, '\n');
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

    watch(
      () => props.value,
      async (newVal, oldVal) => {
        if (newVal !== oldVal) {
          if (
            typeof newVal === 'string' ||
            typeof newVal === 'number' ||
            !newVal
          ) {
            content.value = newVal;
          }
          if (template && newVal) {
            let obj = newVal as IData;
            if (typeof newVal === 'string') {
              try {
                obj = JSON.parse(newVal);
              } catch (error) {
                ibiz.log.error('JSON字符串转换错误');
              }
            }
            if (!Array.isArray(obj)) {
              // 不是数组，合并父数据
              Object.assign(obj, { data: { ...props.data } });
            }
            content.value = await ibiz.util.hbs.render(template, obj);
          }
        }
      },
      {
        immediate: true,
      },
    );

    return {
      ns,
      content,
      type,
      template,
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
      >
        {this.content && (
          <iBizRawItem
            class={this.ns.b('content')}
            content={this.content}
            type={this.type}
          ></iBizRawItem>
        )}
      </div>
    );
  },
});
