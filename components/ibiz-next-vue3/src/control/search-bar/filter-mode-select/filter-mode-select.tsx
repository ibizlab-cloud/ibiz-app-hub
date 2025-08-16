import { ValueOP } from '@ibiz-template/runtime';
import { defineComponent, computed } from 'vue';

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
    /** 显示可选的过滤类型 */
    const availableModes = computed(() => {
      if (props.modes?.length) {
        return FilterModes.filter(item => props.modes!.includes(item.valueOP));
      }
      return FilterModes;
    });

    /**
     * 选择变更处理
     * @author lxm
     * @date 2023-10-16 04:54:58
     * @param {string} value
     */
    const onChange = (value: string) => {
      emit('change', value);
    };

    return { availableModes, onChange };
  },
  render() {
    return (
      <el-select
        model-value={this.value}
        disabled={this.disabled}
        teleported={false}
        onChange={(value: string) => {
          this.onChange(value);
        }}
      >
        {this.availableModes.map(mode => {
          return (
            <el-option
              key={mode.valueOP}
              value={mode.valueOP}
              label={mode.label}
            />
          );
        })}
      </el-select>
    );
  },
});
