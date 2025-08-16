import { useNamespace } from '@ibiz-template/vue3-util';
import { defineComponent } from 'vue';

import './right-icon.scss';

export const IBizCommonRightIcon = defineComponent({
  name: 'IBizCommonRightIcon',
  setup() {
    const ns = useNamespace('editor-right-icon');
    return { ns };
  },
  render() {
    return (
      <ion-icon class={this.ns.b()} name='chevron-forward-outline'></ion-icon>
    );
  },
});
