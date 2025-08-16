/* eslint-disable no-bitwise */
import { computed, Ref, ref, watch } from 'vue';
import useStore from '@/store';
import useStyle from './useStyle';
import type RowItem from '@/models/data/row';
import useEvent from './useEvent';

export default () => {
  const store = useStore();

  const currentTop = computed(() => store.$param.currentTop);

  const { rowHeight } = useStyle();
  const { EmitVirtualTableChange } = useEvent();

  // 预加载条数
  const { preload } = store.$param;

  // 数据展示最上面的 index
  const top = computed(() => {
    const index = Math.ceil(currentTop.value / rowHeight.value);
    return Math.max(index - preload, 0);
  });

  // 数据展示最下面的 index
  const bottom = computed(() => {
    const count = Math.ceil(store.$param.rootHeight / rowHeight.value);
    const t = Math.ceil(currentTop.value / rowHeight.value) + count + preload;
    return Math.min(t, store.$data.length);
  });

  // 切出要展示的数据
  const inView: Ref<RowItem[]> = ref([]);
  watch(
    () => [top.value, bottom.value, store.$data.flatData],
    () => {
      inView.value = store.$data.flatData.filter(
        x => x.flatIndex < bottom.value && x.flatIndex >= top.value,
      );
      EmitVirtualTableChange(inView.value);
    },
  );

  return {
    inView,
  };
};
