/* eslint-disable no-return-assign */
import { useNamespace } from '@ibiz-template/vue3-util';
import { computed, defineComponent, PropType, Ref, ref, watch } from 'vue';

export const FilterFieldSelect = defineComponent({
  name: 'IBizFilterFieldSelect',
  props: {
    value: String,
    modes: {
      type: Array as PropType<IData[]>,
      default: () => [],
    },
    disabled: Boolean,
  },
  emits: {
    change: (_mode: string) => true,
  },
  setup(props, { emit }) {
    const showPicker = ref(false);

    const ns = useNamespace(`filter-field-select`);

    const items = computed(() => {
      return props.modes.map(x => {
        return {
          text: x.label,
          value: x.name,
        };
      });
    });

    // 当前值
    const valueText: Ref<string> = ref('');

    watch(
      () => props.value,
      newVal => {
        if (newVal || newVal === null) {
          const index = items.value.findIndex(
            (item: IData) => item.value === newVal,
          );
          if (index !== -1) {
            valueText.value = items.value[index].text;
          }
          if (newVal === null) {
            valueText.value = '';
          }
        }
      },
      { immediate: true, deep: true },
    );

    /**
     * @description 数据改变
     * @param {{ selectedOptions: IData[] }} { selectedOptions }
     */
    const onChange = ({ selectedOptions }: { selectedOptions: IData[] }) => {
      showPicker.value = false;
      if (Array.isArray(selectedOptions)) {
        emit('change', selectedOptions[0].value);
      }
    };

    const openPopup = () => {
      if (props.disabled) {
        return;
      }
      showPicker.value = true;
    };

    return { ns, showPicker, valueText, items, onChange, openPopup };
  },
  render() {
    return (
      <div class={this.ns.b()}>
        <van-field
          v-model={this.valueText}
          is-link
          readonly
          disabled={this.disabled}
          label={ibiz.i18n.t('control.searchBar.property')}
          onClick={this.openPopup}
        />
        <van-popup
          v-model:show={this.showPicker}
          teleport='body'
          round
          position='bottom'
        >
          <van-picker
            columns={this.items}
            onCancel={() => {
              this.showPicker = false;
            }}
            onConfirm={this.onChange}
          ></van-picker>
        </van-popup>
      </div>
    );
  },
});
