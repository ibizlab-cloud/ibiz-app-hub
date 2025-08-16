import { useNamespace } from '@ibiz-template/vue3-util';
import { PropType, defineComponent, ref } from 'vue';
import './preset-view-back.scss';
import { useRoute } from 'vue-router';
import { useViewStack } from '../../util';

export const IBizPresetViewBack = defineComponent({
  name: 'IBizPresetViewBack',
  props: {
    view: {
      type: Object as PropType<IData>,
      required: true,
    },
  },
  setup(props) {
    const ns = useNamespace('preset-view-back');

    const route = useRoute();
    const { viewStack } = useViewStack();
    const backButtonVisible = ref(false);
    const initButtonVisible = () => {
      if (
        (props.view.modal.viewUsage === 1 &&
          viewStack.cacheKeys.length > 1 &&
          route.meta.home) ||
        props.view.modal.viewUsage === 2
      ) {
        backButtonVisible.value = true;
      }
    };

    if (ibiz.config.view.mobShowPresetBack) {
      initButtonVisible();
    }

    const goBack = () => {
      props.view.modal.dismiss();
    };
    return {
      ns,
      backButtonVisible,
      goBack,
    };
  },
  render() {
    return (
      this.backButtonVisible && (
        <div class={this.ns.b()} onClick={this.goBack}>
          <ion-icon name='chevron-back-outline'></ion-icon>
        </div>
      )
    );
  },
});
