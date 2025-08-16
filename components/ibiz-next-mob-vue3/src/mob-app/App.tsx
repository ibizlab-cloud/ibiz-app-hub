import { routerCallback } from '@ibiz-template/vue3-util';
import { Modal, ViewMode } from '@ibiz-template/runtime';
import { defineComponent, onUnmounted, ref } from 'vue';
import { useViewStack } from '../util';
import './App.scss';

export default defineComponent({
  setup() {
    const { viewStack, on, off } = useViewStack();
    const transitionName = ref('forward');
    const onViewStackChange = (type: 'push' | 'pop') => {
      transitionName.value = type === 'push' ? 'forward' : 'back';
    };

    ibiz.platform.init();

    on('onBeforeStackChange', onViewStackChange);

    onUnmounted(() => {
      off('onBeforeStackChange', onViewStackChange);
      ibiz.platform.destroyed();
    });

    const viewModals = new Map<string, Modal>();

    const getViewModal = (key: string) => {
      if (!viewModals.has(key)) {
        viewModals.set(
          key,
          new Modal({
            mode: ViewMode.ROUTE,
            viewUsage: 1,
            routeDepth: 1,
            dismiss: modal => {
              routerCallback.close(key, modal);
              ibiz.platform.back();
              viewModals.delete(key);
            },
          }),
        );
      }
      return viewModals.get(key);
    };

    return {
      viewStack,
      getViewModal,
      transitionName,
    };
  },
  render() {
    return (
      <iBizRouterView
        manualKey={this.viewStack.currentKey}
        modal={this.getViewModal(this.viewStack.currentKey)}
      >
        {({ Component }: { Component: string }) => {
          return Component ? <Component /> : null;
        }}
      </iBizRouterView>
    );
  },
});
