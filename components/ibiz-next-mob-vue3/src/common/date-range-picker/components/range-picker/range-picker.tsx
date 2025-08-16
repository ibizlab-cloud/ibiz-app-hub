/* eslint-disable @typescript-eslint/no-explicit-any */
import { debounce } from '@ibiz-template/core';
import { useNamespace } from '@ibiz-template/vue3-util';
import { defineComponent, Ref, ref, watch } from 'vue';
import dayjs from 'dayjs';
import {
  validateDate,
  validateRange,
  validateResults,
} from '../../date-range-picker.util';
import './range-picker.scss';

export const RangePicker = defineComponent({
  name: 'RangePicker',
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
    const ns = useNamespace('range-picker');

    // 选中值
    const select: Ref<string[]> = ref([]);

    // 年月日国际化
    const tYear = ibiz.i18n.t('component.dateRangePicker.year');
    const tMonth = ibiz.i18n.t('component.dateRangePicker.month');
    const tDay = ibiz.i18n.t('component.dateRangePicker.day');

    // 编辑态开始时间input框绑定变量
    const startDate = ref({
      editorRef: null, // 开始时间的input框Ref
      date: '', // input框输入的值
      showErrorInfo: false, // 显示错误信息
      isFocus: false, // 输入框是否聚焦
      errorMsg: '', // 错误信息
      isRangeError: false, // 是否超出范围限制
    });

    // 编辑态结束时间input框绑定变量
    const endDate = ref({
      editorRef: null, // 结束时间的input框Ref
      date: '', // input框输入的值
      showErrorInfo: false, // 显示错误信息
      isFocus: false, // 输入框是否聚焦
      errorMsg: '', // 错误信息
      isRangeError: false, // 是否超出范围限制
    });

    // 监听值变化
    watch(
      () => props.value,
      () => {
        if (
          !props.value ||
          !Array.isArray(props.value) ||
          props.value.length === 0 ||
          props.value[0] === '' ||
          props.value[1] === ''
        ) {
          select.value = [];
          startDate.value.date = '';
          endDate.value.date = '';
        } else {
          select.value = props.value;
          // 抛出去的值可以根据format进行格式化，但手动输入的时候只能走YYYY/M/D 格式， IOS里 new Date()不识别以 '-'连接的方式
          startDate.value.date = dayjs(select.value[0]).format('YYYY/M/D');
          endDate.value.date = dayjs(select.value[1]).format('YYYY/M/D');
        }
      },
      {
        immediate: true,
        deep: true,
      },
    );

    /**
     * 绘制错误提示信息
     *
     */
    const renderErrorInfo = (tag: 'START' | 'END') => {
      return (
        <div class={ns.be('calendar-input', 'error')}>
          {tag === 'START' ? startDate.value.errorMsg : endDate.value.errorMsg}
        </div>
      );
    };

    /**
     * 绘制开始时间和结束时间 范围异常时的提示
     * 返回false,表示范围异常，否则表示无异常或不满足范围异常检测条件
     *
     */
    const calcRangeError = () => {
      if (startDate.value.date && endDate.value.date) {
        const start = validateDate(String(startDate.value.date));
        const end = validateDate(String(endDate.value.date));
        if (start && end) {
          const startdate = new Date(startDate.value.date).getTime();
          const enddate = new Date(endDate.value.date).getTime();
          if (startdate > enddate) {
            return false;
          }
        }
      }
      return true;
    };

    /**
     * 输入框防抖
     * 对输入值进行校验，不合规的显示警告，合规的保存
     *
     */
    const debounceInstance = debounce((...args: unknown[]) => {
      // tag：START | END; START表示是开始时间 ，END 表示是结束时间
      // value：输入值
      const [tag, value] = args;
      const result = validateDate(String(value));
      const date = tag === 'START' ? startDate.value : endDate.value;
      if (value) {
        if (!result) {
          // 输入不合法
          date.showErrorInfo = true;
          date.errorMsg = `${ibiz.i18n.t(
            'component.dateRangePicker.formatIsInvalid',
          )}。\n ${ibiz.i18n.t(
            'component.dateRangePicker.use',
          )} yyyy/m/d \n ${ibiz.i18n.t(
            'component.dateRangePicker.example',
          )}: ${dayjs(new Date()).format('YYYY/MM/DD')}`;
        } else if (!validateRange(String(value), props.range)) {
          // 判断该输入是否超过规定年限
          // 超出年限
          date.errorMsg = `${ibiz.i18n.t(
            'component.dateRangePicker.overLimit',
          )}: ${dayjs(String(value)).format(
            `YYYY${tYear}MM${tMonth}DD${tDay}`,
          )}`;
          date.showErrorInfo = true;
        } else {
          date.showErrorInfo = false;
          // 判断是否范围异常,即开始时间大于结束时间
          const rangeResult = calcRangeError();
          if (!rangeResult) {
            startDate.value.isRangeError = true;
            startDate.value.errorMsg = ibiz.i18n.t(
              'component.dateRangePicker.scopeIsInvalid',
            );
            endDate.value.isRangeError = true;
          } else {
            // 输入合法，校验开始和结束两个值是否都正常，都正常的话保存起来
            const validateResult = validateResults(
              [startDate.value.date, endDate.value.date],
              props.range,
            );
            if (validateResult) {
              // 校验通过，保存数据
              select.value = [startDate.value.date, endDate.value.date].map(
                (_item: string) => {
                  return dayjs(_item).format(props.format);
                },
              );
              emit('change', select.value);
            }
          }
        }
      } else {
        date.showErrorInfo = false;
      }
    }, 500);

    /**
     * 输入框输入
     *
     * @param {string} tag
     * @param {string} value
     */
    const onInput = (tag: 'START' | 'END', value: string) => {
      if (tag === 'START') {
        startDate.value.showErrorInfo = false;
      } else {
        endDate.value.showErrorInfo = false;
      }
      startDate.value.isRangeError = false;
      endDate.value.isRangeError = false;
      debounceInstance(tag, value);
    };

    // 聚焦
    const onfocus = (tag: 'START' | 'END') => {
      if (tag === 'START') {
        startDate.value.isFocus = true;
      } else {
        endDate.value.isFocus = true;
      }
    };

    // 失焦
    const onBlur = (tag: 'START' | 'END') => {
      if (tag === 'START') {
        startDate.value.isFocus = false;
      } else {
        endDate.value.isFocus = false;
      }
    };

    // 点击输入框容器-显示输入框
    const onClick = (tag: 'START' | 'END') => {
      if (tag === 'START') {
        if (startDate.value.editorRef) {
          (startDate.value.editorRef as any).focus();
        }
      } else if (endDate.value.editorRef) {
        (endDate.value.editorRef as any).focus();
      }
    };

    return {
      ns,
      startDate,
      endDate,
      onInput,
      onfocus,
      onBlur,
      onClick,
      renderErrorInfo,
    };
  },
  render() {
    return (
      <div class={this.ns.b()}>
        <div class={this.ns.b('calendar-input')}>
          <div
            class={[
              this.ns.be('calendar-input', 'start'),
              this.ns.is('focus', this.startDate.isFocus),
              this.ns.is(
                'error',
                this.startDate.showErrorInfo || this.startDate.isRangeError,
              ),
              this.ns.is(
                'show-input',
                !!this.startDate.date || this.startDate.isFocus,
              ),
            ]}
            onClick={() => this.onClick('START')}
          >
            <div class={this.ns.bem('calendar-input', 'start', 'label')}>
              {ibiz.i18n.t('component.dateRangePicker.startDate')}
            </div>
            <van-field
              ref={(el: any) => {
                this.startDate.editorRef = el;
              }}
              class={this.ns.bem('calendar-input', 'start', 'input')}
              v-model={this.startDate.date}
              placeholder='yyyy/m/d'
              onInput={() => this.onInput('START', this.startDate.date)}
              onFocus={() => this.onfocus('START')}
              onBlur={() => this.onBlur('START')}
            ></van-field>
            {(this.startDate.showErrorInfo || this.startDate.isRangeError) &&
              this.renderErrorInfo('START')}
          </div>
          <div
            class={[
              this.ns.be('calendar-input', 'end'),
              this.ns.is('focus', this.endDate.isFocus),
              this.ns.is(
                'error',
                this.endDate.showErrorInfo || this.endDate.isRangeError,
              ),
              this.ns.is(
                'show-input',
                !!this.endDate.date || this.endDate.isFocus,
              ),
            ]}
            onClick={() => this.onClick('END')}
          >
            <div class={this.ns.bem('calendar-input', 'end', 'label')}>
              {ibiz.i18n.t('component.dateRangePicker.endDate')}
            </div>
            <van-field
              ref={(el: any) => {
                this.endDate.editorRef = el;
              }}
              class={this.ns.bem('calendar-input', 'end', 'input')}
              v-model={this.endDate.date}
              placeholder='yyyy/m/d'
              onInput={() => this.onInput('END', this.endDate.date)}
              onFocus={() => this.onfocus('END')}
              onBlur={() => this.onBlur('END')}
            ></van-field>
            {this.endDate.showErrorInfo && this.renderErrorInfo('END')}
          </div>
        </div>
      </div>
    );
  },
});
