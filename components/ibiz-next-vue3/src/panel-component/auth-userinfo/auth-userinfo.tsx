import { defineComponent, PropType, VNode, inject, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useNamespace } from '@ibiz-template/vue3-util';
import './auth-userinfo.scss';
import { IPanelRawItem } from '@ibiz/model-core';
import { PanelItemController, CTX } from '@ibiz-template/runtime';

/**
 * 用户信息
 * @description 展示用户的基本信息，提供登出功能。
 * @primary
 */
export const AuthUserinfo = defineComponent({
  name: 'IBizAuthUserinfo',
  props: {
    /**
     * @description 用户信息控件模型数据
     */
    modelData: {
      type: Object as PropType<IPanelRawItem>,
      required: true,
    },
    /**
     * @description 用户信息控件控制器
     */
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
      loginname,
    } = ibiz.appData?.context || {};
    const router = useRouter();

    const ctx = inject<CTX | undefined>('ctx', undefined);

    const menuAlign = computed(() => {
      if (ctx?.view) {
        return ctx.view.model.mainMenuAlign || 'LEFT';
      }
      return 'LEFT';
    });

    const onClick = () => {
      ibiz.hub.controller.logout();
    };

    const isCollapse = computed(() => {
      return (c.panel.view.state as IData).isCollapse;
    });

    return {
      ns,
      c,
      onClick,
      srfusername,
      loginname,
      router,
      menuAlign,
      isCollapse,
    };
  },
  render() {
    return (
      <div
        class={[
          this.ns.b(),
          this.ns.m(this.modelData.id),
          ...this.controller.containerClass,
          this.ns.is('left', this.menuAlign === 'LEFT'),
          this.ns.is('top', this.menuAlign === 'TOP'),
          this.ns.is('collapse', this.isCollapse),
        ]}
      >
        <el-dropdown>
          {{
            default: (): VNode => (
              <div
                class={[
                  this.ns.b('info'),
                  this.ns.is('collapse', this.isCollapse),
                ]}
              >
                <div class={this.ns.b('label')}>
                  <el-avatar
                    class={this.ns.b('avatar')}
                    src='./assets/images/user-avatar.png'
                  />

                  <div
                    class={[
                      this.ns.b('name'),
                      this.ns.is('collapse', this.isCollapse),
                    ]}
                  >
                    <div class={this.ns.be('name', 'user-name')}>
                      {this.srfusername}
                    </div>
                    {this.menuAlign === 'LEFT' && this.loginname && (
                      <div class={this.ns.be('name', 'person-name')}>
                        {this.loginname}
                      </div>
                    )}
                  </div>
                </div>
                <ion-icon
                  class={[
                    this.ns.e('down'),
                    this.ns.is('collapse', this.isCollapse),
                  ]}
                  name='chevron-down-outline'
                ></ion-icon>
              </div>
            ),
            dropdown: (): VNode => (
              <el-dropdown-menu>
                <el-dropdown-item>
                  <ion-icon name='log-out-outline' class={this.ns.e('icon')} />
                  <span onClick={this.onClick}>
                    {ibiz.i18n.t('app.logout')}
                  </span>
                </el-dropdown-item>
              </el-dropdown-menu>
            ),
          }}
        </el-dropdown>
      </div>
    );
  },
});
