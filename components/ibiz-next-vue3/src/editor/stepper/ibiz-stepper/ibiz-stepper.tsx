import { computed, defineComponent, ref, watch } from 'vue';
import {
  getEditorEmits,
  getStepperProps,
  useNamespace,
} from '@ibiz-template/vue3-util';
import { isNilOrEmpty } from 'qx-util';
import { toNumber } from 'lodash-es';
import './ibiz-stepper.scss';
import { StepperEditorController } from '../stepper-editor.controller';

/**
 * 步进器
 *
 * @description 使用el-input-number组件，在数值框的基础上，增加或减少特定数值。支持编辑器类型包含：`步进器`
 * @primary
 * @editorparams {name:stepvalue,parameterType:number,defaultvalue:1,description:el-input-number组件的step属性，设置递增递减的步进值}
 * @editorparams {name:precision,parameterType:number,defaultvalue:0,description:el-input-number组件的precision属性，设置数值精度}
 * @editorparams {name:maxvalue,parameterType:number,defaultvalue:Infinity,description:el-input-number组件的max属性，设置步进器允许的最大值}
 * @editorparams {name:minvalue,parameterType:number,defaultvalue:-Infinity,description:el-input-number组件的min属性，设置步进器允许的最小值}
 * @editorparams {"name":"readonly","parameterType":"boolean","defaultvalue":false,"description":"设置编辑器是否为只读态"}
 * @ignoreprops autoFocus | overflowMode
 * @ignoreemits enter | infoTextChange
 */
export const IBizStepper = defineComponent({
  name: 'IBizStepper',
  props: getStepperProps<StepperEditorController>(),
  emits: getEditorEmits(),
  setup(props, { emit }) {
    const ns = useNamespace('stepper');

    const c = props.controller;

    const editorModel = c.model;

    const currentVal = ref<number | null>(null);

    // 步进器步长
    let step = 1;
    // 数值精度
    let precision = 0;
    // 设置步进器允许的最大值
    let max = Infinity;
    // 设置步进器允许的最小值
    let min = -Infinity;
    if (editorModel.editorParams) {
      if (editorModel.editorParams.stepvalue) {
        step = toNumber(editorModel.editorParams.stepvalue);
      }
      if (editorModel.editorParams.precision) {
        precision = toNumber(editorModel.editorParams.precision);
      }
      if (editorModel.editorParams.maxvalue) {
        max = toNumber(editorModel.editorParams.maxvalue);
      }
      if (editorModel.editorParams.minvalue) {
        min = toNumber(editorModel.editorParams.minvalue);
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
          const number = Number(newVal);
          currentVal.value = Number.isNaN(number) ? 0 : number;
        }
      },
      { immediate: true },
    );

    const handleChange = (e: number | null): void => {
      emit('change', e);
    };

    const inputRef = ref();

    // 聚焦
    const onFocus = (): void => {
      emit('focus');
    };

    // 失焦
    const onBlur = (): void => {
      emit('blur');
    };

    return {
      ns,
      c,
      currentVal,
      handleChange,
      inputRef,
      step,
      precision,
      max,
      min,
      onFocus,
      onBlur,
      showFormDefaultContent,
    };
  },
  render() {
    let content = null;
    if (this.readonly) {
      // 只读显示
      content = isNilOrEmpty(this.currentVal) ? '' : `${this.currentVal}`;
    } else {
      // 编辑态显示
      content = [
        <el-input-number
          ref='inputRef'
          v-model={this.currentVal}
          placeholder={this.c.placeHolder}
          precision={this.precision}
          min={this.min}
          max={this.max}
          step={this.step}
          disabled={this.disabled}
          onChange={this.handleChange}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          {...this.$attrs}
        ></el-input-number>,
      ];
    }

    return (
      <div
        class={[
          this.ns.b(),
          this.disabled ? this.ns.m('disabled') : '',
          this.readonly ? this.ns.m('readonly') : '',
          this.ns.is('show-default', this.showFormDefaultContent),
        ]}
      >
        {content}
      </div>
    );
  },
});
