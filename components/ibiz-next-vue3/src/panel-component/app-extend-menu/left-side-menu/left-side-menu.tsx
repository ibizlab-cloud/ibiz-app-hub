/* eslint-disable array-callback-return */
import { defineComponent, PropType } from 'vue';
import { IAppMenuItem, IPanelRawItem } from '@ibiz/model-core';
import { useNamespace } from '@ibiz-template/vue3-util';
import { LeftSideMenuController } from './left-side-menu.controller';
import './left-side-menu.scss';

/**
 * 左侧菜单
 * @primary
 * @description 首页视图扩展菜单左侧菜单
 * @panelitemparams {name:rendermode,parameterType:'BUTTON' | 'MENU',defaultvalue:BUTTON,description:菜单项绘制模式，其中BUTTON表示按照按钮形态绘制（按钮形态目前仅支持一层）、MENU表示按照菜单形态绘制}
 * @primary
 */
export const LeftSideMenu = defineComponent({
  name: 'IBizLeftSideMenu',
  props: {
    /**
     * @description 模型数据
     */
    modelData: {
      type: Object as PropType<IPanelRawItem>,
      required: true,
    },
    /**
     * @description 左侧菜单控制器
     */
    controller: {
      type: LeftSideMenuController,
      required: true,
    },
  },
  setup(props) {
    const ns = useNamespace('left-side-menu');

    const { state } = props.controller;

    return { ns, state };
  },
  render() {
    if (!this.controller.appMenu) {
      return null;
    }
    return (
      <div class={this.ns.b()}>
        <iBizCommonExtendMenu
          renderMode={this.controller.rawItemParams.rendermode}
          items={this.state.items}
          menuItemsState={this.state.menuItemsState}
          providers={this.controller.itemProviders}
          position={'LEFT'}
          layoutMode={this.controller.appMenu.layoutMode}
          layout={this.controller.appMenu.layout}
          onMenuItemClick={(item: IAppMenuItem, event: MouseEvent) => {
            this.controller.handleClickMenuItem(item, event);
          }}
        ></iBizCommonExtendMenu>
      </div>
    );
  },
});
