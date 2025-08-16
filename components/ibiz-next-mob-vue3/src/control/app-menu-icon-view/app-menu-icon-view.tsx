import { IAppMenu } from '@ibiz/model-core';
import { computed, defineComponent, PropType } from 'vue';
import { AppMenuController, IControlProvider } from '@ibiz-template/runtime';
import { prepareControl, useControlController } from '@ibiz-template/vue3-util';
import './app-menu-icon-view.scss';

export const AppMenuIconViewControl = defineComponent({
  name: 'IBizAppMenuIconViewControl',
  props: {
    modelData: { type: Object as PropType<IAppMenu>, required: true },
    context: { type: Object as PropType<IContext>, required: true },
    params: { type: Object as PropType<IParams>, default: () => ({}) },
    provider: { type: Object as PropType<IControlProvider> },
  },
  setup() {
    const c = useControlController((...args) => new AppMenuController(...args));
    const { controlClass, ns } = prepareControl(c);

    // 默认激活菜单项
    const columnNum = computed(() => {
      // todo 根据屏幕宽度计算显示多少列
      return 5;
    });
    return {
      controlClass,
      c,
      columnNum,
      ns,
    };
  },
  render() {
    const { model } = this.c;
    const { controlStyle } = model;
    return (
      <van-grid
        clickable
        column-num={this.columnNum}
        border={false}
        class={[
          this.ns.b(),
          this.ns.b(controlStyle!.toLowerCase()),
          this.ns.m(this.modelData.id),
        ]}
      >
        {(model as IAppMenu)?.appMenuItems?.map(item => {
          return (
            item.itemType === 'MENUITEM' &&
            item.hidden !== true && (
              <van-grid-item
                class={this.ns.b('item')}
                text={item.caption}
                onClick={(event: MouseEvent) =>
                  this.c.onClickMenuItem(item.id!, event, false)
                }
              >
                {{
                  icon: () => {
                    return (
                      <div class={this.ns.b('icon')}>
                        {item.sysImage ? (
                          <iBizIcon icon={item.sysImage}></iBizIcon>
                        ) : (
                          <van-icon name='setting-o'></van-icon>
                        )}
                      </div>
                    );
                  },
                }}
              </van-grid-item>
            )
          );
        })}
      </van-grid>
    );
  },
});
