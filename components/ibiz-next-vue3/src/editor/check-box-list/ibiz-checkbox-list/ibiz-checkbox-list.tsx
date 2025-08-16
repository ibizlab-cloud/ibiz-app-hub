import { computed, defineComponent, ref, watch } from 'vue';
import {
  getCheckboxListProps,
  getEditorEmits,
  useFocusAndBlur,
  useNamespace,
  useCodeListListen,
  useAutoFocusBlur,
} from '@ibiz-template/vue3-util';
import { isNil } from 'ramda';
import {
  CodeListItem,
  useCalcOrMode,
  useCalcOrModeType,
  useCodeListSelection,
} from '@ibiz-template/runtime';
import { CheckBoxListEditorController } from '../checkbox-list-editor.controller';
import './ibiz-checkbox-list.scss';

/**
 * 选项框列表
 *
 * @description 使用el-checkbox-group组件，通过选项框组选择多项数据，该组件通常用于绘制代码表。支持编辑器类型包含：`选项框列表`
 * @primary
 * @editorparams {name:rownumber,parameterType:number,description:设置每行呈现的选项框个数}
 * @editorparams {name:allitems,parameterType:boolean,defaultvalue:false,description:选项框列表是否启用全部项}
 * @editorparams {name:itemstext,parameterType:string,defaultvalue:'全部',description:选项框列表全部项文本}
 * @editorparams {"name":"readonly","parameterType":"boolean","defaultvalue":false,"description":"设置编辑器是否为只读态"}
 * @ignoreprops autoFocus | overflowMode
 * @ignoreemits blur | focus | enter
 */
export const IBizCheckboxList = defineComponent({
  name: 'IBizCheckboxList',
  props: getCheckboxListProps<CheckBoxListEditorController>(),
  emits: getEditorEmits(),
  setup(props, { emit }) {
    const ns = useNamespace('checkbox-list');

    const c = props.controller;

    const codeList = c.codeList;

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

    // 代码表数据
    const items = ref<readonly CodeListItem[]>([]);
    watch(
      () => props.data,
      newVal => {
        c.loadCodeList(newVal).then(_codeList => {
          items.value = c.handleCodeListAllItems(_codeList);
        });
      },
      {
        immediate: true,
        deep: true,
      },
    );

    const currentMode = computed(() => {
      if (codeList && codeList.orMode) {
        return codeList.orMode;
      }
      return 'STR';
    });

    const calcOrMode: useCalcOrModeType = useCalcOrMode(
      currentMode.value,
      c.model.valueType,
    );

    const fn = (data: CodeListItem[] | undefined) => {
      if (data) items.value = c.handleCodeListAllItems(data);
    };

    useCodeListListen(c.model.appCodeListId, c.context.srfappid, fn);

    // 值分隔符
    let valueSeparator = ',';
    if (codeList && codeList.valueSeparator) {
      valueSeparator = codeList.valueSeparator;
    }

    const { useInFocusAndBlur, useInValueChange } = useAutoFocusBlur(
      props,
      emit,
    );

    const { getSelection, getSelectionValue } = useCodeListSelection(
      c.allItemsValue,
    );

    // 选中数组
    const selectArray = computed({
      get() {
        if (!isNil(props.value)) {
          const { getSelectArray } = calcOrMode;
          const selectsArray = getSelectArray(
            props.value,
            codeList,
            items.value,
            valueSeparator,
            codeList?.codeItemValueNumber,
          );
          if (selectsArray) {
            if (c.allItems) {
              return getSelection([], selectsArray, items.value, items.value);
            }
            return selectsArray;
          }
        }
        return [];
      },
      set(val: Array<string | number>) {
        if (c.allItems) {
          const selection = getSelection(
            selectArray.value,
            val,
            items.value,
            items.value,
          );
          val = getSelectionValue(selection);
        }
        let value: null | string | number | string[] | number[] = null;
        const { setSelectArray } = calcOrMode;
        value = setSelectArray(val, items.value, valueSeparator);
        emit('change', value);
        useInValueChange();
      },
    });

    const onSelectArrayChange = (value: Array<string | number>) => {
      selectArray.value = value;
    };

    const valueText = computed(() => {
      const valueArr = Array.isArray(selectArray.value)
        ? selectArray.value
        : [selectArray.value];

      return items.value
        .filter(item => {
          let isInclude = false;
          valueArr.forEach(val => {
            // eslint-disable-next-line eqeqeq
            if (val == item.value) {
              isInclude = true;
            }
          });
          return isInclude;
        })
        .map(item => item.text)
        .join(',');
    });

    watch(
      valueText,
      (newVal, oldVal) => {
        if (newVal !== oldVal) {
          emit('infoTextChange', newVal);
        }
      },
      { immediate: true },
    );

    // 聚焦失焦事件
    const { componentRef: editorRef } = useFocusAndBlur(
      () => emit('focus'),
      () => useInFocusAndBlur(),
    );

    return {
      ns,
      items,
      selectArray,
      valueText,
      editorRef,
      onSelectArrayChange,
      showFormDefaultContent,
    };
  },
  render() {
    return (
      <div
        ref='editorRef'
        class={[
          this.ns.b(),
          this.disabled ? this.ns.m('disabled') : '',
          this.readonly ? this.ns.m('readonly') : '',
          this.ns.is('show-default', this.showFormDefaultContent),
          this.ns.is('grid-layout', !!this.controller.rowNumber),
        ]}
        style={
          this.controller.rowNumber
            ? `${this.ns.cssVarBlockName('group-row-number')}:${
                this.controller.rowNumber
              }`
            : ''
        }
      >
        {this.readonly ? (
          this.valueText
        ) : (
          <el-checkbox-group
            model-value={this.selectArray}
            onChange={this.onSelectArrayChange}
            {...this.$attrs}
          >
            {this.items.map((item, index: number) => (
              <el-checkbox
                key={index}
                label={item.value}
                disabled={this.disabled || item.disableSelect === true}
              >
                <span class={this.ns.e('text')}>{item.text}</span>
              </el-checkbox>
            ))}
          </el-checkbox-group>
        )}
      </div>
    );
  },
});
