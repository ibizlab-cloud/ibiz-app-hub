import { computed, defineComponent, PropType, ref } from 'vue';
import { useNamespace, useController } from '@ibiz-template/vue3-util';
import { IDEFormIFrame } from '@ibiz/model-core';
import { FormIFrameController } from '@ibiz-template/runtime';
import './form-iframe.scss';

export const FormIFrame = defineComponent({
  name: 'IBizFormIFrame',
  props: {
    modelData: {
      type: Object as PropType<IDEFormIFrame>,
      required: true,
    },
    controller: {
      type: FormIFrameController,
      required: true,
    },
  },
  setup(props) {
    const c = props.controller;
    const ns = useNamespace('form-iframe');
    useController(c);

    const loading = ref(true);

    const url = computed(() => {
      return c.calcIFrameUrl();
    });

    const onLoad = () => {
      loading.value = false;
    };

    return { ns, url, loading, onLoad };
  },
  render() {
    if (!this.controller.state.visible || !this.url) {
      return null;
    }
    return (
      <div v-loading={this.loading} class={this.ns.b()}>
        <iframe
          class={this.ns.e('iframe')}
          src={this.url}
          frameborder='0'
          onLoad={() => this.onLoad()}
          onError={() => this.onLoad()}
        ></iframe>
      </div>
    );
  },
});
export default FormIFrame;
