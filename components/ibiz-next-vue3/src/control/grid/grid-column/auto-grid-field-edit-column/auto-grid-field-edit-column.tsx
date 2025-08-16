import {
  h,
  defineComponent,
  resolveComponent,
  ref,
  computed,
  PropType,
} from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import {
  GridFieldEditColumnController,
  GridRowState,
} from '@ibiz-template/runtime';
import { isNil } from 'ramda';
import { RuntimeError } from '@ibiz-template/core';
import { useRowEdit } from './row-edit';
import { useAllEdit } from '../grid-field-edit-column/all-edit';

export const AutoGridFieldEditColumn = defineComponent({
  name: 'IBizAutoGridFieldEditColumn',
  props: {
    controller: {
      type: GridFieldEditColumnController,
      required: true,
    },
    row: {
      type: GridRowState,
      required: true,
    },
    attrs: {
      type: Object as PropType<IData>,
      required: false,
    },
  },
  setup(props) {
    const ns = useNamespace('grid-field-edit-column');
    const componentRef = ref();

    const c = props.controller;

    // 编辑器值变更事件
    const rowDataChange = async (
      val: unknown,
      name?: string,
      ignore: boolean = false,
    ): Promise<void> => {
      ibiz.log.debug(`${c.fieldName}值变更`, val);
      await c.setRowValue(props.row, val, name, ignore);
    };

    const useByShowMode = (): {
      gridEditItemProps: IData;
      editorProps: IData;
    } => {
      switch (c.grid.editShowMode) {
        case 'row':
          return useRowEdit(props, componentRef);
        case 'all':
          return useAllEdit(props, componentRef);
        default:
          throw new RuntimeError(
            ibiz.i18n.t('control.common.noSupportItem', {
              name: c.grid.editShowMode,
            }),
          );
      }
    };
    const { gridEditItemProps, editorProps } = useByShowMode();

    const infoText = ref<string | undefined>(undefined);
    const onInfoTextChange = (text: string): void => {
      infoText.value = text;
    };
    const tooltip = computed<string | undefined>(() => {
      // 非信息态不显示tooltip
      if (!editorProps.readonly) {
        return undefined;
      }
      if (isNil(infoText.value)) {
        const val = props.row.data[c.fieldName];
        return c.formatValue(val);
      }
      return infoText.value;
    });

    return {
      c,
      ns,
      componentRef,
      tooltip,
      rowDataChange,
      onInfoTextChange,
      gridEditItemProps,
      editorProps,
    };
  },
  render() {
    const val = this.row.data[this.c.fieldName];

    return (
      <iBizGridEditItem
        {...{
          ref: 'componentRef',
          required: !this.c.editItem.allowEmpty,
          error: this.row.errors[this.c.fieldName],
          overflowMode: this.c.grid.overflowMode,
          class: [
            this.ns.b(),
            this.ns.m('auto'),
            this.ns.m(this.c.grid.overflowMode),
            this.controller.model.cellSysCss?.cssName,
          ],
          ...this.gridEditItemProps,
        }}
      >
        {this.c.editorProvider &&
          h(resolveComponent(this.c.editorProvider.gridEditor), {
            class: this.ns.e('editor'),
            value: val,
            data: this.row.data,
            controller: this.c.editor,
            overflowMode: this.c.grid.overflowMode,
            onChange: this.rowDataChange,
            onInfoTextChange: this.onInfoTextChange,
            title: this.tooltip,
            ...this.editorProps,
            ...this.attrs,
          })}
      </iBizGridEditItem>
    );
  },
});
export default AutoGridFieldEditColumn;
