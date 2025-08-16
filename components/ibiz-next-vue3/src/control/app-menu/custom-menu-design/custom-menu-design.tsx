/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { AppMenuController, formatSeparator } from '@ibiz-template/runtime';
import { useNamespace } from '@ibiz-template/vue3-util';
import { defineComponent, onMounted, PropType, ref, VNode } from 'vue';
import { RuntimeError, showTitle } from '@ibiz-template/core';
import { cloneDeep } from 'lodash-es';
import './custom-menu-design.scss';

/**
 * 用适配器绘制菜单项文本
 * @author lxm
 * @date 2023-12-29 03:36:05
 * @param {string} itemId
 * @param {AppMenuController} c
 * @return {*}  {VNode}
 */
function renderByProvider(itemId: string, c: AppMenuController): VNode {
  const itemModel = c.allAppMenuItems.find(item => item.id === itemId);
  if (!itemModel) {
    throw new RuntimeError(
      `${ibiz.i18n.t('control.menuDesign.noMenuItemModel', {
        menu: itemId,
      })}`,
    );
  }
  const provider = c.itemProviders[itemId];
  if (!provider.renderText) {
    throw new RuntimeError(
      `${ibiz.i18n.t('control.menuDesign.noProviderRenderText', {
        menu: itemId,
      })}`,
    );
  }
  return provider.renderText(itemModel, c);
}

/**
 * 处理菜单自定义配置
 *
 * @param {AppMenuController} c
 * @param {IData[]} items
 * @return {*}
 */

export const MenuDesign = defineComponent({
  name: 'IBizMenuDesign',
  props: {
    controller: {
      type: Object as PropType<AppMenuController>,
      required: true,
    },
    menus: {
      type: Array as PropType<IData[]>,
      required: true,
    },
  },
  emits: ['saved', 'reset'],
  setup(props, { emit }) {
    const ns = useNamespace(`menu-design`);
    const c = props.controller;

    const loading = ref(false);

    const visible = ref(false); // 抽屉是否显示

    const configs = ref<IData[]>([]); // 合并配置后的菜单模型

    const hideSeparator = ref<string[]>([]);

    onMounted(() => {
      hideSeparator.value = formatSeparator(
        'APPMENU',
        c.model.appMenuItems,
        c.state.menuItemsState,
      );
    });

    // 点击选择的时候不触发分组的折叠
    const stopExpand = (event: MouseEvent) => {
      event.stopPropagation();
    };

    // 处理菜单自定义配置保存数据
    const handleMenusSaveData = (items: IData[]) => {
      const tempItems: IData[] = [];
      items.forEach((item: IData) => {
        const config: IData = {
          key: item.key,
          name: item.label,
          type: item.itemType,
          visible: item.config.visible,
        };
        if (item.children?.length) {
          config.children = handleMenusSaveData(item.children);
        }
        tempItems.push(config);
      });
      return tempItems;
    };

    // 折叠分组
    const collapseGroup = (menu: IData) => {
      menu.isCollapse = !menu.isCollapse;
    };

    // 平铺配置项
    const flattenConfigs = (items: IData[]): IData[] => {
      const result: IData[] = [];
      items.forEach(item => {
        result.push(item);
        if (item.children && item.children.length > 0) {
          const tempResult = flattenConfigs(item.children);
          result.push(...tempResult);
        }
      });
      return result;
    };

    // 合并菜单自定义配置
    const mergeMenusConfig = (items: IData[]) => {
      let customConfig: IData[] = [];
      if (c.saveConfigs && c.saveConfigs.length > 0) {
        customConfig = flattenConfigs(c.saveConfigs);
      }
      return items.map((item: IData) => {
        const target = customConfig.find((_item: IData) => {
          return _item.key === item.key;
        });

        const data: IData = {
          ...item,
          isCollapse: true,
          config: {
            visible: true,
          },
        };
        if (item.children?.length) {
          data.children = mergeMenusConfig(item.children);
        }
        if (target) {
          Object.assign(data, {
            config: { visible: target.visible },
          });
        }
        return data;
      });
    };

    // 恢复默认
    const onReset = async () => {
      c.saveConfigs = [];
      await c.customController!.resetCustomModelData();
      configs.value = mergeMenusConfig(cloneDeep(props.menus));
      emit('reset');
    };

    // 保存配置
    const onSave = async () => {
      loading.value = true;
      const saveConfig: IData[] = handleMenusSaveData(configs.value);
      await c.customController!.saveCustomModelData(saveConfig);
      c.saveConfigs = saveConfig;
      loading.value = false;
      emit('saved', saveConfig);
    };

    // 绘制菜单项
    const renderMenuItem = (menu: IData): VNode | undefined => {
      if (!c.state.menuItemsState[menu.key]?.visible) {
        return;
      }
      if (hideSeparator.value.includes(menu.key)) {
        return;
      }
      if (menu.itemType === 'MENUITEM') {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let content: any;
        const provider = c.itemProviders[menu.key];
        if (provider && provider.renderText) {
          content = renderByProvider(menu.key, c);
        } else {
          content = [
            menu.image ? (
              <iBizIcon class={ns.e('icon')} icon={menu.image}></iBizIcon>
            ) : null,
            <span>{menu.label}</span>,
          ];
        }
        return content;
      }
      if (menu.itemType === 'SEPERATOR') {
        const direction =
          c.view.model.mainMenuAlign === 'TOP' ? 'vertical' : 'horizontal';
        return (
          <div class={ns.be('content', 'menu-seperator')}>
            <el-divider
              direction={direction}
              class={ns.e('separator')}
              id={menu.key}
            />
          </div>
        );
      }
    };

    // 绘制分组图标
    const renderGroupIcon = (item: IData) => {
      if (item.children && item.children.length > 0) {
        if (item.isCollapse) {
          return (
            <i
              class={[
                ns.be('menu-set-drawer', 'group-icon'),
                'fa fa-caret-right',
              ]}
              aria-hidden='true'
            ></i>
          );
        }
        return (
          <i
            class={[ns.be('menu-set-drawer', 'group-icon'), 'fa fa-sort-down']}
            aria-hidden='true'
          ></i>
        );
      }
      return null;
    };

    // 绘制菜单项列表树
    const renderMenuList = (items: IData[]) => {
      return items.map((item: IData) => {
        const content = renderMenuItem(item);
        if (!content) return null;
        return (
          <div class={ns.be('content', 'menu-item')}>
            <div
              class={[
                ns.be('content', 'menu-item-content'),
                ns.is('is-menuitem', item.itemType === 'MENUITEM'),
              ]}
            >
              <div
                class={ns.bem('content', 'menu-item-content', 'label')}
                onClick={() => collapseGroup(item)}
              >
                {renderGroupIcon(item)}
                <div
                  class={ns.bem(
                    'content',
                    'menu-item-content',
                    'label-content',
                  )}
                >
                  {content}
                </div>
              </div>
              {item.itemType !== 'SEPERATOR' ? (
                <div class={ns.bem('content', 'menu-item-content', 'checks')}>
                  <el-checkbox
                    v-model={item.config.visible}
                    onClick={stopExpand}
                    label={ibiz.i18n.t('control.menuDesign.visible')}
                    size='large'
                  />
                </div>
              ) : null}
            </div>
            {item.children && item.children.length > 0 ? (
              <div
                class={[
                  ns.bem('content', 'menu-item', 'children'),
                  ns.is('collapse', item.isCollapse),
                ]}
              >
                {renderMenuList(item.children)}
              </div>
            ) : null}
          </div>
        );
      });
    };

    // 弹窗头部
    const renderHeader = () => {
      return (
        <div class={ns.b('header')}>
          <div class={ns.be('header', 'caption')}>
            {ibiz.i18n.t('control.menuDesign.customMenu')}
          </div>
          <div class={ns.be('header', 'actions')}>
            <el-button onClick={onReset} loading={loading.value}>
              {ibiz.i18n.t('control.menuDesign.reset')}
            </el-button>
            <el-button onClick={onSave} loading={loading.value}>
              {ibiz.i18n.t('control.menuDesign.save')}
            </el-button>
          </div>
        </div>
      );
    };

    // 绘制菜单内容
    const renderContent = () => {
      return <div class={ns.b('content')}>{renderMenuList(configs.value)}</div>;
    };

    // 打开弹窗
    const openDesign = () => {
      if (c.runMode === 'DESIGN') {
        return;
      }
      hideSeparator.value = formatSeparator(
        'APPMENU',
        c.model.appMenuItems,
        c.state.menuItemsState,
      );
      configs.value = mergeMenusConfig(cloneDeep(props.menus));
      visible.value = true;
    };

    return {
      ns,
      c,
      configs,
      visible,
      loading,
      onReset,
      renderContent,
      renderHeader,
      onSave,
      openDesign,
    };
  },

  render() {
    return (
      <div class={this.ns.b()}>
        <div
          title={showTitle(ibiz.i18n.t('control.menu.menuSetting'))}
          onClick={this.openDesign}
        >
          <svg
            viewBox='0 0 16 16'
            xmlns='http://www.w3.org/2000/svg'
            height='1em'
            width='1em'
            preserveAspectRatio='xMidYMid meet'
            focusable='false'
            fill='currentColor'
          >
            <g id='augaction/settings' stroke-width='1' fill-rule='evenodd'>
              <path
                d='M11.405 13.975l3.398-5.889L11.405 2.2H4.607L1.208 8.087l3.399 5.889h6.798zm1.023-12.4l3.43 5.938c.205.356.205.793 0 1.149l-3.43 5.938a1.147 1.147 0 0 1-.993.574H4.577c-.41 0-.789-.218-.994-.573L.153 8.66a1.153 1.153 0 0 1 0-1.147l3.43-5.94c.205-.356.584-.575.994-.575h6.858c.409 0 .788.22.993.576zM8.006 9.879c.988 0 1.792-.804 1.792-1.792s-.804-1.792-1.792-1.792-1.792.804-1.792 1.792.804 1.792 1.792 1.792zm0-4.784a2.993 2.993 0 1 1-.002 5.985 2.993 2.993 0 0 1 .002-5.985z'
                id='aug形状结合'
              ></path>
            </g>
          </svg>
        </div>
        <el-drawer
          v-model={this.visible}
          append-to-body
          custom-class={this.ns.b('menu-set-drawer')}
        >
          {{
            default: () => {
              return this.renderContent();
            },
            header: () => {
              return this.renderHeader();
            },
          }}
        </el-drawer>
      </div>
    );
  },
});
