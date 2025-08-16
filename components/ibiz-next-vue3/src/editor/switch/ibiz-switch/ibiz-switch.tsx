import { computed, defineComponent, ref, watch } from 'vue';
import {
  getEditorEmits,
  getSwitchProps,
  useFocusAndBlur,
  useNamespace,
  useAutoFocusBlur,
} from '@ibiz-template/vue3-util';
import './ibiz-switch.scss';
import { SwitchEditorController } from '../switch-editor.controller';

/**
 * 开关
 *
 * @description 使用el-switch组件，表示两种相互对立的状态间的切换，多用于触发「开/关」。支持编辑器类型包含：`开关部件`
 * @primary
 * @editorparams {"name":"dicdata","parameterType":"Array<{value: number;label: string;}>","defaultvalue":[{"value":0,"label":""},{"value":1,"label":""}],"description":"开关的文字描述。在配置的数组中，value值为0时，是 switch 关闭时的文字描述；value值为1时，是 switch 打开时的文字描述"}
 * @editorparams {"name":"readonly","parameterType":"boolean","defaultvalue":false,"description":"设置编辑器是否为只读态"}
 * @ignoreprops overflowMode
 * @ignoreemits blur | focus | enter | infoTextChange
 */
export const IBizSwitch = defineComponent({
  name: 'IBizSwitch',
  props: getSwitchProps<SwitchEditorController>(),
  emits: getEditorEmits(),
  setup(props, { emit }) {
    const ns = useNamespace('switch');
    const c = props.controller;
    const editorModel = c.model;

    // 当前值
    const currentVal = ref<boolean>(false);

    // 文字描述
    let activeText = '';
    let inactiveText = '';

    // 开关文字描述配置
    let dicData: IData[] = [
      { value: 0, label: '' },
      { value: 1, label: '' },
    ];
    if (editorModel.editorParams) {
      if (editorModel.editorParams.dicData) {
        dicData = c.toObj(editorModel.editorParams.dicData) as IData[];
      }
      if (editorModel.editorParams.dicdata) {
        dicData = c.toObj(editorModel.editorParams.dicdata) as IData[];
      }
    }

    if (dicData && Array.isArray(dicData)) {
      const inactiveResult = dicData.find((item: IData) => {
        return item.value === 0;
      });
      if (inactiveResult) {
        inactiveText = inactiveResult.label;
      }
      const activeResult = dicData.find((item: IData) => {
        return item.value === 1;
      });
      if (activeResult) {
        activeText = activeResult.label;
      }
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
      (newVal, oldVal) => {
        if (newVal !== oldVal) {
          if (!newVal) {
            currentVal.value = false;
          } else {
            // eslint-disable-next-line eqeqeq
            currentVal.value = props.value == 1;
          }
        }
      },
      { immediate: true },
    );

    // 自动聚焦时不禁止（表格中）
    const curDisabled = computed(() => {
      if (props.autoFocus) {
        return false;
      }
      return props.disabled || props.readonly;
    });

    const { useInFocusAndBlur, useInValueChange } = useAutoFocusBlur(
      props,
      emit,
    );
    const handleChange = (currentValue: boolean): void => {
      const emitValue = currentValue === true ? 1 : 0;
      emit('change', emitValue);
      useInValueChange();
    };

    // 聚焦失焦事件
    const { componentRef: editorRef } = useFocusAndBlur(
      () => emit('focus'),
      () => useInFocusAndBlur(),
    );

    return {
      ns,
      currentVal,
      curDisabled,
      activeText,
      inactiveText,
      handleChange,
      dicData,
      editorRef,
      showFormDefaultContent,
    };
  },
  render() {
    const attts = { ...this.$attrs, title: '' };
    return (
      <div
        class={[
          this.ns.b(),
          this.ns.is('show-default', this.showFormDefaultContent),
        ]}
        ref='editorRef'
      >
        <el-switch
          v-model={this.currentVal}
          disabled={this.curDisabled}
          activeText={this.activeText}
          inactiveText={this.inactiveText}
          onChange={this.handleChange}
          {...attts}
        ></el-switch>
      </div>
    );
  },
});
