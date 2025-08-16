import { useNamespace } from '@ibiz-template/vue3-util';
import { computed, defineComponent, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import './404-view.scss';

export const View404 = defineComponent({
  setup() {
    const ns = useNamespace('404-view');
    const router = useRouter();
    const route = useRoute();
    const gotoIndexView = () => {
      router.push('/');
    };

    onMounted(() => {
      setTimeout(() => {
        const el = document.getElementById('app-loading-x') as HTMLDivElement;
        if (el) {
          el.style.display = 'none';
        }
      }, 300);
    });

    const isTop = computed(() => {
      return !route.params.view1;
    });

    return { ns, isTop, gotoIndexView };
  },
  render() {
    return <div>404</div>;
  },
});
