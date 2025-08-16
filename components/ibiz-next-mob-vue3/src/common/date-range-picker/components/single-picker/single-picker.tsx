/* eslint-disable @typescript-eslint/no-explicit-any */
import { debounce } from '@ibiz-template/core';
import { useNamespace } from '@ibiz-template/vue3-util';
import { defineComponent, ref, watch } from 'vue';
import dayjs from 'dayjs';
import { validateDate, validateRange } from '../../date-range-picker.util';
import './single-picker.scss';

export const SinglePicker = defineComponent({
  name: 'SinglePicker',
  props: {
    value: {
      type: Array<string>,
      default: null,
    },
    // 格式化串，会将格式化之后的值返回回去
    format: {
      type: String,
      default: 'YYYY-MM-DD',
    },
    // 时间选择范围，默认前后10年
    range: {
      type: Number,
      default: 10,
    },
  },
  emits: ['change'],
  setup(props, { emit }) {
    const ns = useNamespace('single-picker');
    // 当前输入值
    const curDate = ref('');
    // input框编辑器
    const editorRef = ref();
    // 错误消息
    const errorMsg = ref('');
    // 是否聚焦
    const isFoucs = ref(false);

    // 年月日国际化
    const tYear = ibiz.i18n.t('component.dateRangePicker.year');
    const tMonth = ibiz.i18n.t('component.dateRangePicker.month');
    const tDay = ibiz.i18n.t('component.dateRangePicker.day');

    const debounceInstance = debounce((...args: unknown[]) => {
      // value：输入值
      const [value] = args;
      const result = validateDate(String(value));
      if (value) {
        if (!result) {
          // 输入不合法
          errorMsg.value = `${ibiz.i18n.t(
            'component.dateRangePicker.formatIsInvalid',
          )}。\n ${ibiz.i18n.t(
            'component.dateRangePicker.use',
          )} yyyy/m/d \n ${ibiz.i18n.t(
            'component.dateRangePicker.example',
          )}: ${dayjs(new Date()).format('YYYY/MM/DD')}`;
        } else if (!validateRange(String(value), props.range)) {
          // 判断该输入是否超过规定年限
          // 超出年限
          errorMsg.value = `${ibiz.i18n.t(
            'component.dateRangePicker.overLimit',
          )}: ${dayjs(String(value)).format(
            `YYYY${tYear}MM${tMonth}DD${tDay}`,
          )}`;
        } else {
          errorMsg.value = '';
          emit('change', [dayjs(curDate.value).format(props.format)]);
        }
      } else {
        errorMsg.value = '';
      }
    }, 500);

    // 输入框输入
    const onInput = () => {
      errorMsg.value = '';
      debounceInstance(curDate.value);
    };

    // 聚焦
    const onfocus = () => {
      isFoucs.value = true;
    };

    // 失焦
    const onBlur = () => {
      isFoucs.value = false;
    };

    const onClick = () => {
      editorRef.value?.focus();
      isFoucs.value = true;
    };

    watch(
      () => props.value,
      () => {
        if (props.value && props.value[0]) {
          curDate.value = dayjs(props.value[0]).format('YYYY/M/D');
        } else {
          curDate.value = '';
        }
      },
      {
        immediate: true,
        deep: true,
      },
    );

    return {
      ns,
      curDate,
      editorRef,
      isFoucs,
      errorMsg,
      onInput,
      onfocus,
      onBlur,
      onClick,
    };
  },
  render() {
    return (
      <div class={this.ns.b()}>
        <div
          class={[
            this.ns.e('container'),
            this.ns.is('show-input', this.isFoucs || !!this.curDate),
            this.ns.is('error', !!this.errorMsg),
          ]}
          onClick={this.onClick}
        >
          <div class={this.ns.e('label')}>
            {ibiz.i18n.t('component.dateRangePicker.startDate')}
          </div>
          <van-field
            ref='editorRef'
            class={this.ns.e('input')}
            v-model={this.curDate}
            placeholder='yyyy/m/d'
            onInput={this.onInput}
            onFocus={this.onfocus}
            onBlur={this.onBlur}
          ></van-field>
          <div class={this.ns.e('error')}>{this.errorMsg}</div>
        </div>
      </div>
    );
  },
});
