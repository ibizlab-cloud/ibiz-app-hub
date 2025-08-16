/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppMenuController } from '@ibiz-template/runtime';
import { useNamespace } from '@ibiz-template/vue3-util';
import { IAppMenuItem } from '@ibiz/model-core';
import draggable from 'vuedraggable';
import { defineComponent, PropType, ref, watch } from 'vue';
import './custom-menu-design.scss';

/**
 * 处理菜单自定义配置
 *
 * @param {AppMenuController} c
 * @param {IData[]} items
 * @return {*}
 */
export const MenuDesign = defineComponent({
  name: 'IBizMenuDesign',
  components: {
    draggable,
  },
  props: {
    controller: {
      type: Object as PropType<AppMenuController>,
      required: true,
    },
    show: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['close'],
  setup(props, { emit }) {
    const ns = useNamespace('menu-design');
    const c = props.controller;

    // 底部导航菜单
    const mobMenuItems = ref<IAppMenuItem[]>([]);

    // 更多导航菜单
    const moreMenuItems = ref<IAppMenuItem[]>([]);

    const calcMenuItems = () => {
      const menuItems =
        c.model.appMenuItems?.filter(
          item =>
            item.hidden !== true &&
            item.itemType === 'MENUITEM' &&
            c.state.menuItemsState[item.id!].visible,
        ) || [];
      mobMenuItems.value = [...c.state.mobMenuItems];
      moreMenuItems.value = menuItems.filter(
        menu => !c.state.mobMenuItems.find(_item => menu.id === _item.id),
      );
    };

    watch(
      () => props.show,
      () => {
        if (props.show) calcMenuItems();
      },
      {
        immediate: true,
      },
    );

    /**
     * 关闭
     *
     */
    const onClose = () => {
      emit('close');
    };

    /**
     * 保存
     *
     */
    const onSave = async () => {
      await c.customController!.saveCustomModelData(
        mobMenuItems.value.map(menu => {
          return { id: menu.id };
        }),
      );
      c.state.mobMenuItems = mobMenuItems.value;
      onClose();
    };

    /**
     * 处理添加或删除
     *
     * @param {('nav' | 'more')} type
     * @param {number} index
     */
    const handleRemoveOrAdd = (type: 'nav' | 'more', index: number) => {
      if (type === 'nav') {
        const item = mobMenuItems.value[index];
        mobMenuItems.value.splice(index, 1);
        moreMenuItems.value.push(item);
      } else {
        const item = moreMenuItems.value[index];
        moreMenuItems.value.splice(index, 1);
        mobMenuItems.value.push(item);
      }
    };

    /**
     * 绘制拖拽区
     *
     * @param {IAppMenuItem[]} menuItems
     */
    const renderDraggable = (
      type: 'nav' | 'more',
      menuItems: IAppMenuItem[],
    ) => {
      return (
        <draggable
          itemKey='id'
          group='menu-design'
          handle='.draggable-icon'
          list={menuItems}
          class={ns.e('draggable')}
        >
          {{
            item: ({
              element,
              index,
            }: {
              element: IAppMenuItem;
              index: number;
            }) => {
              return (
                <div class={ns.em('draggable', 'item')}>
                  <ion-icon
                    name={type === 'nav' ? 'remove-circle' : 'add-circle'}
                    class={[
                      ns.em('draggable', 'icon'),
                      ns.em(
                        'draggable',
                        type === 'nav' ? 'remove-icon' : 'add-icon',
                      ),
                      ns.em('draggable', 'prefix-icon'),
                    ]}
                    onClick={() => handleRemoveOrAdd(type, index)}
                  ></ion-icon>
                  <div class={ns.em('draggable', 'item-content')}>
                    <div class={ns.em('draggable', 'item-caption')}>
                      <iBizIcon
                        icon={element.sysImage}
                        class={ns.em('draggable', 'item-icon')}
                      ></iBizIcon>
                      <div>{element.caption}</div>
                    </div>
                    <ion-icon
                      name='menu-outline'
                      class={[
                        'draggable-icon',
                        ns.em('draggable', 'icon'),
                        ns.em('draggable', 'suffix-icon'),
                      ]}
                    ></ion-icon>
                  </div>
                </div>
              );
            },
          }}
        </draggable>
      );
    };

    const renderMenuList = (type: 'nav' | 'more') => {
      return (
        <div class={ns.e('group')}>
          <div class={ns.em('group', 'caption')}>
            {type === 'nav'
              ? ibiz.i18n.t('control.appmenu.bottomNav')
              : ibiz.i18n.t('control.appmenu.more')}
          </div>
          {renderDraggable(
            type,
            type === 'nav' ? mobMenuItems.value : moreMenuItems.value,
          )}
        </div>
      );
    };

    return {
      c,
      ns,
      onSave,
      onClose,
      renderMenuList,
    };
  },

  render() {
    return (
      <div class={this.ns.b()}>
        <div class={this.ns.e('header')}>
          <ion-icon
            name='close-outline'
            onClick={this.onClose}
            class={this.ns.em('header', 'close-icon')}
          ></ion-icon>
          <div class={this.ns.em('header', 'caption')}>
            {ibiz.i18n.t('control.appmenu.customNav')}
          </div>
          <div class={this.ns.em('header', 'save')} onClick={this.onSave}>
            {ibiz.i18n.t('control.appmenu.save')}
          </div>
        </div>
        <div class={this.ns.e('content')}>
          {this.renderMenuList('nav')}
          {this.renderMenuList('more')}
        </div>
      </div>
    );
  },
});
