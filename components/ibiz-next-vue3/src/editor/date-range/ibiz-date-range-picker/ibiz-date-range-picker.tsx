import { computed, defineComponent, Ref, ref, watch } from 'vue';
import {
  useNamespace,
  getEditorEmits,
  getDateRangeProps,
} from '@ibiz-template/vue3-util';
import { clone } from 'ramda';
import dayjs from 'dayjs';
import { DateRangeEditorController } from '../date-range-editor.controller';
import './ibiz-date-range-picker.scss';

/**
 * 时间范围选择器
 *
 * @description 使用el-date-picker组件封装，用于选择时间范围。支持编辑器类型包含：`时间范围选择器`、`时间范围选择器（YYYY-MM-DD）`
 * @primary
 * @editorparams {"name":"rangeseparator","parameterType":"string","defaultvalue":"'至'","description":"el-date-picker组件range-separator属性"}
 * @editorparams {"name":"unlinkpanels","parameterType":"boolean","defaultvalue":false,"description":"el-date-picker组件unlink-panels属性"}
 * @editorparams {"name":"valueseparator","parameterType":"string","defaultvalue":"','","description":"值分隔符，用于分割转换字符串为开始时间和结束时间"}
 * @editorparams {"name":"readonly","parameterType":"boolean","defaultvalue":false,"description":"设置编辑器是否为只读态"}
 * @ignoreprops overflowMode
 * @ignoreemits infoTextChange
 */
export const IBizDateRangePicker = defineComponent({
  name: 'IBizDateRangePicker',
  props: getDateRangeProps<DateRangeEditorController>(),
  emits: getEditorEmits(),
  setup(props, { emit }) {
    const ns = useNamespace('date-range-picker');

    const c = props.controller;

    const editorModel = c.model;

    // 值分割符
    let valueSeparator = ',';
    // 在范围选择器里取消两个日期面板之间的联动
    let unlinkPanels = false;
    // 开始占位提示
    const startPlaceHolder = editorModel.placeHolder
      ? editorModel.placeHolder.split(';')[0] || ''
      : '';
    // 结束占位提示
    const endPlaceHolder = editorModel.placeHolder
      ? editorModel.placeHolder.split(';')[1] || ''
      : '';
    // 选择范围时的分隔符
    let rangeSeparator = ibiz.i18n.t('editor.dateRange.rangeSeparator');
    if (editorModel.editorParams) {
      if (editorModel.editorParams.valueSeparator) {
        valueSeparator = editorModel.editorParams.valueSeparator;
      }
      if (editorModel.editorParams.valueseparator) {
        valueSeparator = editorModel.editorParams.valueseparator;
      }
      if (editorModel.editorParams.rangeSeparator) {
        rangeSeparator = editorModel.editorParams.rangeSeparator;
      }
      if (editorModel.editorParams.rangeseparator) {
        rangeSeparator = editorModel.editorParams.rangeseparator;
      }
      if (editorModel.editorParams.unlinkPanels) {
        unlinkPanels = c.toBoolean(editorModel.editorParams.unlinkPanels);
      }
      if (editorModel.editorParams.unlinkpanels) {
        unlinkPanels = c.toBoolean(editorModel.editorParams.unlinkpanels);
      }
    }

    // 类型
    const type = ref('daterange');
    switch (editorModel.editorType) {
      case 'DATERANGE':
      case 'MOBDATERANGE':
        type.value = 'datetimerange';
        break;
      case 'DATERANGE_NOTIME':
      case 'MOBDATERANGE_NOTIME':
        type.value = 'daterange';
        break;
      default:
        type.value = 'datetimerange';
    }

    // 格式
    const format = ref('YYYY-MM-DD');
    // 值格式化
    const valueFormat = c!.valueFormat;
    if (valueFormat) {
      format.value = valueFormat;
    }

    // 关系表单项集合
    const refFormItem: Ref<string[]> = ref([]);
    const editorItems = editorModel.editorItems;
    if (editorItems && editorItems.length > 0) {
      const editorItemNames: string[] = editorItems.map(
        (item: IData) => item.id,
      );
      refFormItem.value = editorItemNames;
    }

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

    const setEditable = (flag: boolean) => {
      if (flag) {
        isEditable.value = flag;
      } else {
        setTimeout(() => {
          isEditable.value = flag;
        }, 100);
      }
    };

    // 当前值
    const curValue = computed({
      get() {
        let value: string[] = [];
        if (refFormItem.value.length > 0) {
          refFormItem.value.forEach((name: string) => {
            if (props.data[name]) {
              value.push(props.data[name]);
            }
          });
        } else if (props.value && typeof props.value === 'string') {
          const dates = props.value.split(valueSeparator);
          // 判断分割出的数据是否是时间格式,其中一个不是时间格式则返回空
          value = dates.every((date: string) => dayjs(date).isValid())
            ? dates
            : [];
        }
        return value;
      },
      set(dates: string[]) {
        if (dates && dates.length > 0) {
          emit('change', dates.join(valueSeparator));
          if (refFormItem.value.length > 0) {
            dates.forEach((date: string, index: number) => {
              emit('change', date, refFormItem.value[index]);
            });
          }
        } else {
          emit('change', null);
          if (refFormItem.value.length > 0) {
            refFormItem.value.forEach((date: string, index: number) => {
              emit('change', null, refFormItem.value[index]);
            });
          }
        }
        setEditable(false);
      },
    });

    // 自动聚焦
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

    // 在日期选择弹框中，选定时间的事件
    const onCalendarChange = (val: IData) => {
      c.dateRange = clone(val);
    };

    const valueText = computed(() => {
      if (curValue.value.length > 0) {
        return `${curValue.value[0]} ${rangeSeparator} ${curValue.value[1]}`;
      }
      return null;
    });

    // 处理点击键盘
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e && e.code === 'Enter') {
        emit('enter', e);
      }
    };

    return {
      ns,
      c,
      refFormItem,
      curValue,
      type,
      format,
      valueSeparator,
      startPlaceHolder,
      endPlaceHolder,
      rangeSeparator,
      unlinkPanels,
      onFocus,
      onBlur,
      editorRef,
      valueText,
      isEditable,
      setEditable,
      showFormDefaultContent,
      handleKeyUp,
      onCalendarChange,
    };
  },
  render() {
    // 编辑态内容
    const editContent = (
      <el-date-picker
        ref='editorRef'
        v-model={this.curValue}
        class={this.ns.b('input')}
        type={this.type}
        popper-class={this.ns.b('popper')}
        format={this.format}
        value-format={this.format}
        disabled={this.disabled}
        readonly={this.readonly}
        range-separator={this.rangeSeparator}
        start-placeholder={this.startPlaceHolder}
        end-placeholder={this.endPlaceHolder}
        unlink-panels={this.unlinkPanels}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onCalendarChange={this.onCalendarChange}
        {...this.$attrs}
      ></el-date-picker>
    );

    // 只读态内容
    const readonlyContent = (
      <div class={(this.ns.b(), this.ns.m('readonly'))}>{this.valueText}</div>
    );

    // 表单默认内容
    const formDefaultContent = (
      <div
        class={[
          this.ns.b('form-default-content'),
          this.ns.is('has-val', this.curValue.length > 0),
        ]}
      >
        {this.curValue.length > 0 ? (
          <el-date-picker
            model-value={this.curValue}
            class={this.ns.b('default-input')}
            type={this.type}
            format={this.format}
            value-format={this.format}
            readonly={true}
            range-separator={this.rangeSeparator}
            start-placeholder={this.startPlaceHolder}
            end-placeholder={this.endPlaceHolder}
            unlink-panels={this.unlinkPanels}
            {...this.$attrs}
          ></el-date-picker>
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
