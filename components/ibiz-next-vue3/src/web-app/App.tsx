import { defineComponent, onUnmounted } from 'vue';
import { Modal, ViewMode } from '@ibiz-template/runtime';
import { AppHooks } from '@ibiz-template/vue3-util';
import './App.scss';

export default defineComponent({
  setup() {
    const modal = new Modal({
      mode: ViewMode.ROUTE,
      viewUsage: 1,
      routeDepth: 1,
    });

    const destroyAppHub = () => {
      // 清除页面关闭监听
      window.removeEventListener('unload', destroyAppHub);
      // 销毁应用基座
      ibiz.hub.destroy();
    };

    // 页面关闭
    window.addEventListener('unload', destroyAppHub);

    // 页面卸载
    onUnmounted(() => {
      destroyAppHub();
      AppHooks.destoryApp.call(null);
    });

    return { modal };
  },
  render() {
    return <router-view modal={this.modal} />;
  },
});
