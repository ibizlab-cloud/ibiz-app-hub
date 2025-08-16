import { ref, Ref, defineComponent, computed, watch, PropType } from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import './ibiz-data-mpicker.scss';
import { clone } from 'ramda';

export const IBizDataMPicker = defineComponent({
  name: 'IBizDataMPicker',
  props: {
    value: {
      type: Object as PropType<Array<string>>,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: [],
    },
    items: {
      type: Object as PropType<Array<IData>>,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: () => [],
    },
    showPicker: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:showPicker', 'change'],
  setup(props, { emit }) {
    const ns = useNamespace('data-mpicker');

    // 模态打开是选择的数据（未确认的缓存）
    const localSelectValue: Ref<string[]> = ref([]);

    // 当前选中数据值
    const curValue = computed({
      get() {
        return localSelectValue.value;
      },
      set(select: Array<string>) {
        localSelectValue.value = select;
      },
    });

    // 监听props.value
    watch(
      () => props.value,
      newVal => {
        if (newVal || newVal === null) {
          localSelectValue.value = newVal;
        }
      },
      { immediate: true },
    );

    // 确定
    const onConfirm = (e: Event) => {
      e.stopPropagation();
      emit('update:showPicker', false);
      // 不能给源对象 不然直接会响应模态打开的数据
      const value = clone(localSelectValue.value);
      emit('change', value);
    };

    const onCancel = (e: Event) => {
      e.stopPropagation();
      emit('update:showPicker', false);
      localSelectValue.value = props.value;
    };

    const checkboxRefs: Ref<IData> = ref([]);
    const toggle = (index: number) => {
      checkboxRefs.value[index].toggle();
    };

    return {
      ns,
      checkboxRefs,
      curValue,
      emit,
      toggle,
      onCancel,
      onConfirm,
    };
  },

  render() {
    const renderToolbar = () => {
      return (
        <div
          class={this.ns.b('toolbar')}
          onClick={(e: Event) => {
            e.stopPropagation();
          }}
        >
          <button
            type='button'
            class={this.ns.be('toolbar', 'cancel')}
            onClick={(e: Event) => {
              this.onCancel(e);
            }}
          >
            {ibiz.i18n.t('editor.common.cancel')}
          </button>
          <button
            type='button'
            class={this.ns.be('toolbar', 'confirm')}
            onClick={(e: Event) => {
              this.onConfirm(e);
            }}
          >
            {ibiz.i18n.t('editor.common.confirm')}
          </button>
        </div>
      );
    };
    const renderColumns = () => {
      return (
        <van-checkbox-group
          class={this.ns.b('columns')}
          v-model={this.curValue}
        >
          <van-cell-group inset>
            {this.items.map((item, index) => {
              return (
                <van-cell
                  title={item.text}
                  clickable
                  onClick={(e: Event) => {
                    e.stopPropagation();
                    this.toggle(index);
                  }}
                >
                  {{
                    'right-icon': () => {
                      return (
                        <van-checkbox
                          // eslint-disable-next-line no-return-assign
                          ref={(el: IData) => (this.checkboxRefs[index] = el)}
                          name={item.value}
                          onClick={(e: Event) => e.stopPropagation()}
                        />
                      );
                    },
                  }}
                </van-cell>
              );
            })}
          </van-cell-group>
        </van-checkbox-group>
      );
    };
    return (
      <van-popup
        class={this.ns.b()}
        v-model:show={this.showPicker}
        round
        close-on-popstate={true}
        position='bottom'
        teleport='body'
        close-on-click-overlay={false}
        onClickOverlay={(e: Event) => {
          e.stopPropagation();
          this.emit('update:showPicker', false);
        }}
      >
        {renderToolbar()}
        {renderColumns()}
      </van-popup>
    );
  },
});
