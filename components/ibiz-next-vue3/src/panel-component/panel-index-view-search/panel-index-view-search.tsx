import { useNamespace } from '@ibiz-template/vue3-util';
import { IPanelRawItem } from '@ibiz/model-core';
import { computed, defineComponent, PropType, ref, inject } from 'vue';
import {
  AppFuncCommand,
  CTX,
  IAppMenuController,
  PanelItemController,
} from '@ibiz-template/runtime';
import { debounce } from 'lodash-es';
import './panel-index-view-search.scss';

/**
 * 首页搜索
 * @primary
 * @description 输入搜索词点击搜索后，会执行绑定的菜单项应用功能，打开全局搜索界面。
 */
export const PanelIndexViewSearch = defineComponent({
  name: 'IBizPanelIndexViewSearch',
  props: {
    /**
     * @description 首页搜索模型数据
     */
    modelData: {
      type: Object as PropType<IPanelRawItem>,
      required: true,
    },
    /**
     * @description 首页搜索控件控制器
     */
    controller: {
      type: PanelItemController,
      required: true,
    },
  },
  setup(props) {
    const ns = useNamespace('panel-index-view-search');

    const c = props.controller;

    const query = ref('');

    const debounceSearch = debounce(() => {}, 500);

    const onInput = (value: string): void => {
      query.value = value;
      debounceSearch();
    };

    const ctx = inject<CTX | undefined>('ctx', undefined);

    const menuAlign = computed(() => {
      if (ctx?.view) {
        return ctx.view.model.mainMenuAlign || 'LEFT';
      }
      return 'LEFT';
    });

    const isCollapse = computed(() => {
      return (c.panel.view.state as IData).isCollapse;
    });

    // 类名控制
    const classArr = computed(() => {
      const { id } = props.modelData;
      const result: Array<string | false> = [
        ns.b(),
        ns.m(id),
        ns.is('collapse', isCollapse.value),
      ];
      result.push(...props.controller.containerClass);
      return result;
    });

    // 全局搜索
    const onSearch = async () => {
      const id = props.modelData.id;
      const menuC = c.panel.view.getController('appmenu') as IAppMenuController;
      if (menuC) {
        const targetMenu = menuC.allAppMenuItems.find((item: IData) => {
          return item.id === id;
        });
        if (targetMenu) {
          const tempContext = c.panel.context.clone();
          const tempParam = c.panel.params;
          tempContext.srfappid = targetMenu.appId || ibiz.env.appId;

          await ibiz.commands.execute(
            AppFuncCommand.TAG,
            targetMenu.appFuncId,
            tempContext,
            { ...tempParam, srfquery: query.value },
            {},
          );
        }
      }
    };

    const onEnter = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        onSearch();
      }
    };

    return {
      ns,
      classArr,
      isCollapse,
      onInput,
      onSearch,
      c,
      query,
      menuAlign,
      onEnter,
    };
  },
  render() {
    // 动态控制显示
    if (!this.controller.state.visible) {
      return;
    }
    return (
      <div class={this.classArr}>
        {this.menuAlign === 'LEFT' && !this.isCollapse && (
          <el-input
            model-value={this.query}
            class={this.ns.b('search')}
            placeholder={ibiz.i18n.t('component.indexSearch.placeholder')}
            onInput={this.onInput}
            onKeyup={this.onEnter}
          >
            {{
              prefix: () => {
                return (
                  <ion-icon class={this.ns.e('search-icon')} name='search' />
                );
              },
            }}
          </el-input>
        )}
      </div>
    );
  },
});
