import { defineComponent, ref, Ref, watch } from 'vue';
import {
  getSpanProps,
  getEditorEmits,
  useNamespace,
  useFocusAndBlur,
} from '@ibiz-template/vue3-util';
import './span-link.scss';
import { SpanEditorController } from '../span-editor.controller';

export const IBizSpanLink = defineComponent({
  name: 'IBizSpanLink',
  props: getSpanProps<SpanEditorController>(),
  emits: getEditorEmits(),
  setup(props, { emit }) {
    const ns = useNamespace('span-link');

    const c = props.controller!;

    const curValue: Ref<string> = ref('');

    watch(
      () => props.value,
      (newVal, oldVal) => {
        if (newVal && newVal !== oldVal) {
          curValue.value = `${newVal}`;
        }
      },
      { immediate: true },
    );

    // 打开数据链接视图
    const openLinkView = async () => {
      await c.openLinkView(props.data);
    };

    // 聚焦失焦事件
    const { componentRef: editorRef } = useFocusAndBlur(
      () => emit('focus'),
      () => emit('blur'),
    );

    return { ns, openLinkView, curValue, editorRef };
  },
  render() {
    return (
      <div
        class={[this.ns.b(), this.readonly ? this.ns.m('readonly') : '']}
        ref='editorRef'
      >
        <a onClick={this.openLinkView}>{this.curValue}</a>
      </div>
    );
  },
});
