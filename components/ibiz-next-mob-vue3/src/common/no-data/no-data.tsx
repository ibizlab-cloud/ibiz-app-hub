import { useNamespace } from '@ibiz-template/vue3-util';
import { defineComponent } from 'vue';
import './no-data.scss';

export const IBizNoData = defineComponent({
  name: 'IBizNoData',
  props: {
    text: {
      type: String,
      default: '暂无数据',
    },
  },
  setup() {
    const ns = useNamespace('no-data');
    return { ns };
  },
  render() {
    return (
      <van-empty class={this.ns.b()} description={this.text}>
        {this.$slots.default?.()}
      </van-empty>
    );
  },
});
