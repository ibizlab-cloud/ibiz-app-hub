import { IPortalAsyncAction } from '@ibiz-template/core';
import { IModal } from '@ibiz-template/runtime';
import { useNamespace } from '@ibiz-template/vue3-util';
import { computed, defineComponent, PropType } from 'vue';
import { isObject } from 'lodash-es';

export const AsyncActionResult = defineComponent({
  name: 'IBizAsyncActionResult',
  props: {
    asyncAction: {
      type: Object as PropType<IPortalAsyncAction>,
      required: true,
    },
    modal: { type: Object as PropType<IModal>, required: true },
  },
  setup(props) {
    const ns = useNamespace('async-action-preview');
    const message = computed(() => {
      if (isObject(props.asyncAction.actionresult)) {
        return JSON.stringify(props.asyncAction.actionresult);
      }
      return `${props.asyncAction.actionresult}`;
    });
    return { ns, message };
  },
  render() {
    return <div class={[this.ns.b()]}>{this.message}</div>;
  },
});
