import { useNamespace } from '@ibiz-template/vue3-util';
import { defineComponent, PropType } from 'vue';
import './not-supported-editor.scss';
import { IEditor } from '@ibiz/model-core';

export const NotSupportedEditor = defineComponent({
  name: 'NotSupportedEditor',
  props: {
    modelData: {
      type: Object as PropType<IEditor>,
      required: true,
    },
  },
  setup() {
    const ns = useNamespace('not-supported-editor');
    return { ns };
  },
  render() {
    return (
      <div class={this.ns.b()}>
        未支持的编辑器类型 - {this.modelData.editorType}
      </div>
    );
  },
});
