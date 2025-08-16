import {
  hasEmptyPanelRenderer,
  IBizCustomRender,
  useControlController,
  useNamespace,
} from '@ibiz-template/vue3-util';
import {
  defineComponent,
  PropType,
  VNode,
  renderSlot,
  VNodeArrayChildren,
} from 'vue';
import { IDEGridColumn, IDETreeGrid } from '@ibiz/model-core';
import { IControlProvider, TreeGridController } from '@ibiz-template/runtime';
import { useRowEditPopover } from '../grid/row-edit-popover/use-row-edit-popover';
import {
  IGridProps,
  useAppGridBase,
  useAppGridPagination,
  useGridHeaderStyle,
  useITableEvent,
} from '../grid/grid';
import { renderChildColumn } from '../grid/grid/grid';

export const TreeGridControl = defineComponent({
  name: 'IBizTreeGridControl',
  props: {
    /**
     * @description 树表格模型数据
     */
    modelData: { type: Object as PropType<IDETreeGrid>, required: true },
    /**
     * @description 应用上下文对象
     */
    context: { type: Object as PropType<IContext>, required: true },
    /**
     * @description 视图参数对象
     * @default {}
     */
    params: { type: Object as PropType<IParams>, default: () => ({}) },
    /**
     * @description 部件适配器
     */
    provider: { type: Object as PropType<IControlProvider> },
    /**
     * @description 部件行数据默认激活模式，值为0:不激活，值为1：单击激活，值为2：双击激活
     */
    mdctrlActiveMode: { type: Number, default: undefined },
    /**
     * @description 是否是单选
     */
    singleSelect: { type: Boolean, default: undefined },
    /**
     * @description 是否启用行编辑
     */
    rowEditOpen: { type: Boolean, default: undefined },
    /**
     * @description 是否是简单模式，即直接传入数据，不加载数据
     */
    isSimple: { type: Boolean, required: false },
    /**
     * @description 简单模式下传入的数据
     */
    data: { type: Array<IData>, required: false },
    /**
     * @description 是否默认加载数据
     * @default true
     */
    loadDefault: { type: Boolean, default: true },
  },
  setup(props, { slots }) {
    const c = useControlController<TreeGridController>(
      (...args) => new TreeGridController(...args),
    );
    // 继承表格部件样式
    const ns = useNamespace(`control-grid`);
    const ns2 = useNamespace(`control-${c.model.controlType!.toLowerCase()}`);

    const {
      tableRef,
      onRowClick,
      onDbRowClick,
      onSelectionChange,
      onSortChange,
      handleRowClassName,
    } = useITableEvent(c);
    const { onPageChange, onPageRefresh, onPageSizeChange } =
      useAppGridPagination(c);
    const {
      tableData,
      renderColumns,
      defaultSort,
      summaryMethod,
      headerDragend,
    } = useAppGridBase(c, props as IGridProps, tableRef);
    const { renderPopover } = useRowEditPopover(tableRef, c);

    const { headerCssVars } = useGridHeaderStyle(tableRef, ns);

    const renderNoData = (): VNode | null => {
      // 未加载不显示无数据
      const { isLoaded } = c.state;
      if (isLoaded) {
        const quickToolbar = c.model.controls?.find(
          item => item.name === `${c.model.name}_quicktoolbar`,
        );
        if (quickToolbar) {
          return (
            <iBizToolbarControl
              modelData={quickToolbar}
              context={c.context}
              params={c.params}
              class={ns.b('quick-toolbar')}
            ></iBizToolbarControl>
          );
        }
        const noDataSlots: IParams = {};
        if (hasEmptyPanelRenderer(c)) {
          Object.assign(noDataSlots, {
            customRender: () => (
              <IBizCustomRender controller={c}></IBizCustomRender>
            ),
          });
        }
        return (
          <iBizNoData
            text={c.model.emptyText}
            emptyTextLanguageRes={c.model.emptyTextLanguageRes}
          >
            {noDataSlots}
          </iBizNoData>
        );
      }
      return null;
    };

    //  触发节点加载数据
    const loadData = async (
      item: IData,
      _row: unknown,
      callback: (nodes: IData[]) => void,
    ) => {
      const treeGirdItems: IData[] = c.state.items.map(data =>
        c.getTreeGridDataItem(data),
      );
      const items = treeGirdItems.filter(
        data => item[c.treeGridValueField] === data[c.treeGridParentField],
      );
      item.children = items;
      callback(items);
    };

    // 绘制批操作工具栏
    const renderBatchToolBar = (): VNode | undefined => {
      const batchToolbar = c.model.controls?.find(item => {
        return item.name === `${c.model.name!}_batchtoolbar`;
      });
      if (!batchToolbar || c.state.singleSelect) {
        return;
      }
      return (
        <div
          class={[
            ns.b('batch-toolbar'),
            ns.is('show', c.state.selectedData.length > 0),
          ]}
        >
          <div class={ns.b('batch-toolbar-content')}>
            <div class={ns.b('batch-toolbar-text')}>
              {ibiz.i18n.t('control.common.itemsSelected', {
                length: c.state.selectedData.length,
              })}
            </div>
            <div class={ns.b('batch-toolbar-separator')}>|</div>
            <iBizToolbarControl
              modelData={batchToolbar}
              context={c.context}
              params={c.params}
              class={ns.b('batch-toolbar-items')}
            ></iBizToolbarControl>
          </div>
        </div>
      );
    };

    const renderColumn = (
      model: IDEGridColumn,
      index: number,
    ): VNode | null => {
      if (slots[model.id!]) {
        return renderSlot(slots, model.id!, {
          model,
          data: c.state.items,
        });
      }
      return renderChildColumn(c, model, renderColumns.value, index);
    };

    return {
      c,
      ns,
      ns2,
      tableRef,
      tableData,
      renderColumns,
      renderColumn,
      defaultSort,
      onDbRowClick,
      onRowClick,
      onSelectionChange,
      onSortChange,
      onPageChange,
      onPageSizeChange,
      onPageRefresh,
      handleRowClassName,
      renderNoData,
      loadData,
      summaryMethod,
      headerDragend,
      renderPopover,
      renderBatchToolBar,
      headerCssVars,
    };
  },
  render() {
    const state = this.c.state;
    const { hideHeader, enablePagingBar } = this.c.model;
    return (
      <iBizControlBase
        class={[
          this.ns.b(),
          this.ns2.b(),
          this.ns.is('show-header', !hideHeader),
          this.ns.is('enable-page', enablePagingBar),
          this.ns.is('enable-group', this.c.model.enableGroup),
          this.ns.is('enable-customized', this.c.model.enableCustomized),
        ]}
        controller={this.c}
        style={this.headerCssVars}
      >
        {this.c.state.isLoaded && (
          <el-table
            ref={'tableRef'}
            class={this.ns.e('table')}
            default-sort={this.defaultSort}
            border
            show-header={!hideHeader}
            show-summary={this.c.enableAgg}
            summary-method={this.summaryMethod}
            highlight-current-row={state.singleSelect}
            row-class-name={this.handleRowClassName}
            row-key={'srfkey'}
            data={
              this.c.state.showTreeGrid ? state.treeGirdData : this.tableData
            }
            onRowClick={this.onRowClick}
            onRowDblclick={this.onDbRowClick}
            onSelectionChange={this.onSelectionChange}
            onSortChange={this.onSortChange}
            onHeaderDragend={this.headerDragend}
            tooltip-effect={'light'}
            tree-props={{ children: 'children', hasChildren: 'hasChildren' }}
            load={this.loadData}
            lazy
          >
            {{
              empty: this.renderNoData,
              default: (): VNodeArrayChildren => {
                return [
                  !state.singleSelect && (
                    <el-table-column
                      class-name={this.ns.e('selection')}
                      type='selection'
                      width='55'
                    ></el-table-column>
                  ),
                  state.isCreated &&
                    this.renderColumns.map((model, index) => {
                      return this.renderColumn(model, index);
                    }),
                ];
              },
              append: () => {
                return this.renderPopover();
              },
            }}
          </el-table>
        )}
        {enablePagingBar && (
          <iBizPagination
            total={state.total}
            curPage={state.curPage}
            size={state.size}
            totalPages={state.totalPages}
            onChange={this.onPageChange}
            onPageSizeChange={this.onPageSizeChange}
            onPageRefresh={this.onPageRefresh}
          ></iBizPagination>
        )}
        {this.c.model.enableCustomized && !hideHeader && (
          <div class={this.ns.b('setting-box')}>
            <iBizGridSetting
              columnStates={state.columnStates}
              controller={this.c}
            ></iBizGridSetting>
          </div>
        )}
        {this.renderBatchToolBar()}
      </iBizControlBase>
    );
  },
});
