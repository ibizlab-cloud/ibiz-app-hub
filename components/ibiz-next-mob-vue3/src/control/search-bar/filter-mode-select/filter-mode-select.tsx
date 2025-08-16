/* eslint-disable no-return-assign */
import { useNamespace } from '@ibiz-template/vue3-util';
import { ValueOP } from '@ibiz-template/runtime';
import { defineComponent, computed, ref, Ref, watch } from 'vue';

const FilterModes = [
  { valueOP: ValueOP.EQ, label: '等于(=)' },
  { valueOP: ValueOP.NOT_EQ, label: '不等于(<>)' },
  { valueOP: ValueOP.GT, label: '大于(>)' },
  { valueOP: ValueOP.GT_AND_EQ, label: '大于等于(>=)' },
  { valueOP: ValueOP.LT, label: '小于(<)' },
  { valueOP: ValueOP.LT_AND_EQ, label: '小于等于(<=)' },
  { valueOP: ValueOP.IS_NULL, label: '值为空(Nil)' },
  { valueOP: ValueOP.IS_NOT_NULL, label: '值不为空(NotNil)' },
  { valueOP: ValueOP.IN, label: '值在范围中(In)' },
  { valueOP: ValueOP.NOT_IN, label: '值不在范围中(NotIn)' },
  { valueOP: ValueOP.LIKE, label: '文本包含(%)' },
  { valueOP: ValueOP.LIFT_LIKE, label: '文本左包含(%#)' },
  { valueOP: ValueOP.RIGHT_LIKE, label: '文本右包含(#%)' },
  { valueOP: ValueOP.EXISTS, label: '存在(EXISTS)' },
  { valueOP: ValueOP.NOT_EXISTS, label: '不存在(NOTEXISTS)' },
] as const;

export const FilterModeSelect = defineComponent({
  name: 'IBizFilterModeSelect',
  props: {
    value: String,
    modes: Array<string>,
    disabled: Boolean,
  },
  emits: {
    change: (_mode: string) => true,
  },
  setup(props, { emit }) {
    const showPicker = ref(false);

    const ns = useNamespace(`filter-mode-select`);
    /** 显示可选的过滤类型 */
    const availableModes = computed(() => {
      if (props.modes?.length) {
        return FilterModes.filter(item =>
          props.modes!.includes(item.valueOP),
        ).map(x => {
          return {
            text: x.label,
            value: x.valueOP,
          };
        });
      }
      return FilterModes.map(x => {
        return {
          text: x.label,
          value: x.valueOP,
        };
      });
    });

    // 当前值
    const valueText: Ref<string> = ref('');

    watch(
      () => props.value,
      newVal => {
        if (newVal || newVal === null) {
          const index = FilterModes.findIndex(
            (item: IData) => item.valueOP === props.value,
          );
          if (index !== -1) {
            valueText.value = FilterModes[index].label;
          }
          if (newVal === null) {
            valueText.value = '';
          }
        }
      },
      { immediate: true, deep: true },
    );

    /**
     * 选择变更处理
     * @author lxm
     * @date 2023-10-16 04:54:58
     * @param {string} value
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

    return { ns, availableModes, showPicker, valueText, onChange, openPopup };
  },
  render() {
    return (
      <div class={this.ns.b()}>
        <van-field
          v-model={this.valueText}
          is-link
          readonly
          label={ibiz.i18n.t('control.searchBar.operate')}
          onClick={this.openPopup}
        />
        <van-popup
          v-model:show={this.showPicker}
          teleport='body'
          round
          position='bottom'
        >
          <van-picker
            columns={this.availableModes}
            onCancel={() => {
              this.showPicker = false;
            }}
            onConfirm={this.onChange}
          />
        </van-popup>
      </div>
    );
  },
});
