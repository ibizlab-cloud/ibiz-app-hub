import {
  AppMenuIconViewController,
  IControlProvider,
} from '@ibiz-template/runtime';
import { useControlController, useNamespace } from '@ibiz-template/vue3-util';
import { IAppMenu, IAppMenuItem } from '@ibiz/model-core';
import { defineComponent, PropType, Ref, ref, VNode } from 'vue';
import './app-menu-portlet.scss';
import { showTitle } from '@ibiz-template/core';

export const AppMenuPortletControl = defineComponent({
  name: 'IBizAppMenuPortletControl',
  props: {
    modelData: { type: Object as PropType<IAppMenu>, required: true },
    context: { type: Object as PropType<IContext>, required: true },
    params: { type: Object as PropType<IParams>, default: () => ({}) },
    provider: { type: Object as PropType<IControlProvider> },
    collapse: Boolean,
    currentPath: String,
  },
  setup() {
    const c = useControlController(
      (...args) => new AppMenuIconViewController(...args),
    );
    const ns = useNamespace(
      `control-${c.model.controlType!.toLowerCase()}-portlet`,
    );
    // 默认激活菜单项
    const defaultActive = ref('');
    // 默认展开菜单项数组
    const defaultOpens: Ref<string[]> = ref([]);
    c.model.appMenuItems?.forEach(item => {
      if (item.itemType === 'MENUITEM') {
        defaultOpens.value.push(item.id!);
      }
    });

    const onClick = async (key: string, event: MouseEvent): Promise<void> => {
      await c.onClickMenuItem(key, event);
    };

    const renderItem = (item: IAppMenuItem): VNode | null => {
      const state = c.state.menuItemsState[item.id!];
      if (!state.visible) {
        return null;
      }
      return (
        <div
          class={[ns.b('item'), ns.is('disabled', !item.appFuncId)]}
          title={showTitle(item.tooltip || item.caption)}
          onClick={(event): void => {
            if (item.appFuncId) {
              onClick(item.id!, event);
            }
          }}
        >
          <iBizIcon
            class={ns.be('item', 'icon')}
            icon={item.sysImage}
          ></iBizIcon>
          <span class={ns.be('item', 'label')}>{item.caption}</span>
        </div>
      );
    };

    const renderGroup = (item: IAppMenuItem): VNode | null => {
      const state = c.state.menuItemsState[item.id!];
      if (!state.visible) {
        return null;
      }
      if (!item.appMenuItems) {
        return renderItem(item);
      }
      return (
        <el-collapse-item
          class={ns.b('group')}
          name={item.id}
          title={showTitle(item.caption)}
        >
          {item.appMenuItems?.map(child => {
            return renderItem(child);
          })}
        </el-collapse-item>
      );
    };

    return {
      c,
      ns,
      defaultActive,
      defaultOpens,
      onClick,
      renderGroup,
      renderItem,
    };
  },
  render() {
    const { state, model } = this.c;
    let content: VNode | null = null;
    if (state.isCreated && model.appMenuItems?.length) {
      content = (
        <el-collapse class={this.ns.e('content')} v-model={this.defaultOpens}>
          {model.appMenuItems.map(item => {
            if (item.itemType !== 'MENUITEM') {
              return null;
            }
            return this.renderGroup(item);
          })}
        </el-collapse>
      );
    }

    return (
      <iBizControlBase class={[this.ns.b()]} controller={this.c}>
        {content}
      </iBizControlBase>
    );
  },
});
