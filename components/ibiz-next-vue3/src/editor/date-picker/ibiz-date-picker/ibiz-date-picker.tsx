/* eslint-disable no-nested-ternary */
import { ref, watch, defineComponent, computed } from 'vue';
import {
  useNamespace,
  getEditorEmits,
  getDatePickerProps,
} from '@ibiz-template/vue3-util';
import dayjs from 'dayjs';
import { DatePickerEditorController } from '../date-picker-editor.controller';
import './ibiz-date-picker.scss';

/**
 * 时间选择器
 *
 * @description 使用el-time-picker和el-date-picker组件封装，用于选择时间或者选择日期。支持编辑器类型包含：`时间选择器`、`时间选择器（旧）`、`时间选择器（YYYY-MM-DD）`、`时间选择器（YYYY-MM-DD、HH）`、`时间选择器（YYYY-MM-DD、HH:mm）`、`时间选择器（YYYY-MM-DD、HH:mm:ss）`、`时间选择器（HH:mm:ss）`、`时间选择器（HH:mm）`
 * @primary
 * @editorparams {"name":"readonly","parameterType":"boolean","defaultvalue":false,"description":"设置编辑器是否为只读态"}
 * @ignoreprops overflowMode
 */
export const IBizDatePicker = defineComponent({
  name: 'IBizDatePicker',
  props: getDatePickerProps<DatePickerEditorController>(),
  emits: getEditorEmits(),
  setup(props, { emit }) {
    const ns = useNamespace('date-picker');
    const c = props.controller;

    const editorModel = c!.model;

    const type = ref('date');

    const format = ref('YYYY-MM-DD');

    const isTimePicker = ref(false);

    // 是否编辑态
    const isEditable = ref(false);

    // 编辑器Ref
    const editorRef = ref();

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

    switch (editorModel.editorType) {
      case 'DATEPICKEREX':
      case 'DATEPICKEREX_NOTIME':
      case 'MOBDATE_NOTIME':
        type.value = 'date';
        break;
      case 'DATEPICKEREX_NODAY':
      case 'DATEPICKEREX_NODAY_NOSECOND':
      case 'MOBDATE_NODAY':
      case 'MOBDATE_NODAY_NOSECOND':
        isTimePicker.value = true;
        type.value = 'time';
        break;
      case 'DATEPICKEREX_HOUR':
      case 'DATEPICKEREX_MINUTE':
      case 'DATEPICKEREX_SECOND':
      case 'DATEPICKEREX_NOSECOND':
      case 'DATEPICKER':
      case 'MOBDATE':
      case 'MOBDATE_HOUR':
      case 'MOBDATE_MINUTE':
      case 'MOBDATE_SECOND':
      default:
        type.value = 'datetime';
    }
    // 值格式化
    const valueFormat = c!.valueFormat;
    if (valueFormat) {
      format.value = valueFormat;
    }

    // 格式化后的值
    const formatValue = ref();
    watch(
      () => props.value,
      (newVal, oldVal) => {
        // 空值不转换
        if (newVal && newVal !== oldVal) {
          const formatVal = dayjs(newVal).format(valueFormat);
          if (formatVal !== 'Invalid Date') {
            formatValue.value = formatVal;
          } else {
            formatValue.value = newVal;
          }
        } else if (newVal == null) {
          formatValue.value = newVal;
        }
      },
      { immediate: true },
    );

    const setEditable = (flag: boolean) => {
      if (flag) {
        isEditable.value = flag;
      } else {
        setTimeout(() => {
          isEditable.value = flag;
        }, 100);
      }
    };

    // 处理值变更
    const handleChange = (date: string, _dateType: IData) => {
      emit('change', date);
      setEditable(false);
    };

    watch(editorRef, newVal => {
      if (props.autoFocus && newVal && newVal.focus) {
        newVal.focus();
      }
    });

    // 聚焦
    const onFocus = (e: IData) => {
      emit('focus', e);
      setEditable(true);
    };

    // 失焦
    const onBlur = (e: IData) => {
      emit('blur', e);
      setEditable(false);
    };

    watch(
      formatValue,
      (newVal, oldVal) => {
        if (newVal !== oldVal) {
          emit('infoTextChange', newVal);
        }
      },
      { immediate: true },
    );

    // 处理点击键盘
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e && e.code === 'Enter') {
        emit('enter', e);
      }
    };

    return {
      ns,
      c,
      editorModel,
      type,
      format,
      formatValue,
      handleChange,
      editorRef,
      isTimePicker,
      onFocus,
      onBlur,
      isEditable,
      setEditable,
      showFormDefaultContent,
      handleKeyUp,
    };
  },
  render() {
    // 编辑态内容
    const editContent = this.isTimePicker ? (
      <el-time-picker
        ref='editorRef'
        class={[this.ns.b('input')]}
        type={this.type}
        format={this.format}
        value-format={this.format}
        placeholder={this.c!.placeHolder}
        v-model={this.formatValue}
        onChange={this.handleChange}
        disabled={this.disabled}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        {...this.$attrs}
      ></el-time-picker>
    ) : (
      <el-date-picker
        ref='editorRef'
        class={[this.ns.b('input')]}
        type={this.type}
        format={this.format}
        value-format={this.format}
        placeholder={this.c!.placeHolder}
        v-model={this.formatValue}
        onChange={this.handleChange}
        disabled={this.disabled}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        {...this.$attrs}
      ></el-date-picker>
    );

    // 只读态内容
    const readonlyContent = this.formatValue;

    // 表单默认内容
    const formDefaultContent = (
      <div class={this.ns.b('form-default-content')}>
        {this.formatValue ? (
          this.formatValue
        ) : (
          <iBizEditorEmptyText
            showPlaceholder={this.c.emptyShowPlaceholder}
            placeHolder={this.c.placeHolder}
          />
        )}
      </div>
    );

    return (
      <div
        class={[
          this.ns.b(),
          this.disabled ? this.ns.m('disabled') : '',
          this.readonly ? this.ns.m('readonly') : '',
          this.ns.e(this.editorModel.editorType),
          this.ns.is('editable', this.isEditable),
          this.ns.is('show-default', this.showFormDefaultContent),
        ]}
        onKeyup={this.handleKeyUp}
      >
        {this.showFormDefaultContent && formDefaultContent}
        {this.readonly ? readonlyContent : editContent}
      </div>
    );
  },
});
