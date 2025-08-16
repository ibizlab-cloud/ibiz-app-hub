import {
  defineComponent,
  onUnmounted,
  ref,
  toRaw,
  h,
  resolveComponent,
  PropType,
  onActivated,
  onDeactivated,
} from 'vue';
import { IRouteViewData, parseRouteViewData } from '@ibiz-template/vue3-util';
import { useRoute, useRouter } from 'vue-router';
import { IModal, Modal, RouteConst, ViewMode } from '@ibiz-template/runtime';
import { IBizContext } from '@ibiz-template/core';
import { mergeDeepLeft } from 'ramda';

export const RouterShell = defineComponent({
  name: 'RouterShell',
  props: {
    modal: {
      type: Object as PropType<IModal>,
      required: true,
    },
  },
  setup(props) {
    const route = useRoute();
    const router = useRouter();
    const viewData = ref<IRouteViewData>({});
    const isLoaded = ref(false);
    const isActivated = ref(true);
    const destroyContext = () => {
      if (viewData.value.context) {
        const { context } = toRaw(viewData.value);
        if (context) context.destroy();
      }
    };
    const routeDepth = props.modal.routeDepth! || 1;

    // 销毁视图上下文
    onUnmounted(() => {
      destroyContext();
    });

    // 根据应用模型解析视图参数
    const calcViewData = async () => {
      // 获取视图
      try {
        const _viewData = await parseRouteViewData(route, routeDepth);
        // 封装IBizContext
        const _context = IBizContext.create(_viewData.context);
        viewData.value = {
          ..._viewData,
          context: _context,
        };
        // 确定视图组件
        isLoaded.value = true;
      } catch (error) {
        router.push({ name: `404View${routeDepth}` });
      }
    };
    calcViewData();

    const routeModal = new Modal({
      mode: ViewMode.ROUTE,
      routeDepth: routeDepth + 1,
    });

    onActivated(() => {
      isActivated.value = true;
    });

    onDeactivated(() => {
      isActivated.value = false;
    });
    return {
      route,
      viewData,
      isLoaded,
      isActivated,
      routeModal,
    };
  },
  render() {
    if (!this.isLoaded) {
      return null;
    }
    const { context, params, srfnav, viewConfig } = this.viewData;
    const props = mergeDeepLeft(
      {
        ...this.$props,
        ...this.$attrs,
        context,
        params,
        viewId: viewConfig!.id,
        key: viewConfig!.codeName,
      },
      { state: { srfnav } },
    );

    return (
      <>
        {h(resolveComponent('IBizViewShell') as string, props, this.$slots)}
        {this.isActivated && (
          <router-view
            key={viewConfig!.codeName}
            name={RouteConst.ROUTE_MODAL_TAG}
            modal={this.routeModal}
          />
        )}
      </>
    );
  },
});
