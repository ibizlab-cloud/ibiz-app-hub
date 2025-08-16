import { PropType, computed, defineComponent } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import './mdctrl-container.scss';

export const MDCtrlContainer = defineComponent({
  name: 'IBizMDCtrlContainer',
  props: {
    enableCreate: {
      type: Boolean,
      required: true,
    },
    enableDelete: {
      type: Boolean,
      required: true,
    },
    items: {
      type: Object as PropType<IData[]>,
      required: true,
    },
    caption: {
      type: String,
      required: false,
    },
  },
  emits: {
    addClick: (_index?: number) => true,
    removeClick: (_data: IData, _index: number) => true,
  },
  setup(props, { emit }) {
    const ns = useNamespace('mdctrl-container');

    /** 是否显示操作按钮 */
    const showActions = computed(() => {
      return props.enableCreate || props.enableDelete;
    });

    const renderAddBtn = (index?: number, showButton: boolean = true) => {
      if (!props.enableCreate) {
        return null;
      }
      return (
        <van-button
          class={[ns.e('create'), ns.e('btn')]}
          size='small'
          onClick={(): void =>
            emit('addClick', index === undefined ? undefined : index + 1)
          }
        >
          {showButton && <van-icon name='plus' />}
          {ibiz.i18n.t('app.add')}
        </van-button>
      );
    };

    const renderRemoveBtn = (item: IData, index: number) => {
      if (!props.enableDelete) {
        return null;
      }
      if (ibiz.config.form.mdCtrlConfirmBeforeRemove) {
        return (
          <van-button
            class={[ns.e('remove'), ns.e('btn')]}
            size='small'
            onClick={() => {
              emit('removeClick', item, index);
            }}
          >
            {ibiz.i18n.t('app.delete')}
          </van-button>
        );
      }
      return (
        <van-button
          class={[ns.e('remove'), ns.e('btn')]}
          type='danger'
          size='small'
          onClick={() => {
            emit('removeClick', item, index);
          }}
        >
          {ibiz.i18n.t('app.delete')}
        </van-button>
      );
    };

    const renderActionBtn = (item: IData, index: number) => {
      return [renderAddBtn(index, false), renderRemoveBtn(item, index)];
    };

    return { ns, showActions, renderAddBtn, renderRemoveBtn, renderActionBtn };
  },
  render() {
    return (
      <div class={this.ns.b()}>
        {this.items.map((item, index) => {
          const formComponent = this.$slots.item ? (
            this.$slots.item({ data: item, index })
          ) : (
            <div>{ibiz.i18n.t('control.form.mdCtrlContainer.noSlot')}</div>
          );
          return (
            <div class={this.ns.b('item')} key={item.id}>
              <div class={this.ns.b('item-header')}>
                <div class={this.ns.be('item-header', 'caption')}>
                  {this.caption || ''}
                </div>
                <div class={this.ns.be('item-header', 'action')}>
                  {this.renderActionBtn(item, index)}
                </div>
              </div>
              <div class={this.ns.b('item-content')}>{formComponent}</div>
            </div>
          );
        })}
        {this.enableCreate && (
          <div class={this.ns.b('footer')}>{this.renderAddBtn()}</div>
        )}
      </div>
    );
  },
});
