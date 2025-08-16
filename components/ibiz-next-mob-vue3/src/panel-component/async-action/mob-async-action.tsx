/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { defineComponent } from 'vue';
import { getRawProps, useNamespace } from '@ibiz-template/vue3-util';
import { MobAsyncActionController } from './mob-async-action.controller';
import { AsyncActionTab } from './async-action-tab/async-action-tab';
import './mob-async-action.scss';

export const MobAsyncAction = defineComponent({
  name: 'MobAsyncAction',
  props: getRawProps<MobAsyncActionController>(),
  setup() {
    const ns = useNamespace('mob-async-action');
    const noticeController = ibiz.hub.notice;
    return {
      ns,
      noticeController,
    };
  },
  render() {
    return (
      <div class={[this.ns.b()]}>
        <AsyncActionTab
          controller={this.noticeController.asyncAction}
        ></AsyncActionTab>
      </div>
    );
  },
});
