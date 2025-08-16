import { defineComponent, PropType } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import './auth-userinfo.scss';
import { IPanelRawItem } from '@ibiz/model-core';
import { PanelItemController } from '@ibiz-template/runtime';

export const AuthUserinfo = defineComponent({
  name: 'IBizAuthUserinfo',
  props: {
    modelData: {
      type: Object as PropType<IPanelRawItem>,
      required: true,
    },
    controller: {
      type: PanelItemController,
      required: true,
    },
  },
  setup(prop) {
    const ns = useNamespace('user-info');
    const c = prop.controller;
    const {
      srfusername = ibiz.i18n.t('panelComponent.authUserinfo.visitor'),
      srfpersonname,
      srforgname,
    } = ibiz.appData?.context || {};

    return {
      ns,
      c,
      srfusername,
      srfpersonname,
      srforgname,
    };
  },
  render() {
    return (
      <div
        class={[
          this.ns.b(),
          this.ns.m(this.modelData.id),
          ...this.controller.containerClass,
        ]}
      >
        <div class={this.ns.b('left')}>
          <van-image>
            {{
              error: () => {
                return <van-icon name='contact-o' />;
              },
              loading: () => {
                return <van-icon name='contact-o' />;
              },
            }}
          </van-image>
        </div>
        <div class={this.ns.b('center')}>
          <div class={this.ns.e('username')}>
            {this.srfusername || this.srfpersonname}
          </div>
          <div class={this.ns.e('org')}>{this.srforgname}</div>
        </div>
        <div class={this.ns.b('right')}>
          <van-icon name='arrow' />
        </div>
      </div>
    );
  },
});
