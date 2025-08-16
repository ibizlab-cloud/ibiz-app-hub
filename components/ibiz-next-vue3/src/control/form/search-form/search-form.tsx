/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IControlProvider,
  IModal,
  SearchFormController,
} from '@ibiz-template/runtime';
import { useControlController, useNamespace } from '@ibiz-template/vue3-util';
import { IDESearchForm } from '@ibiz/model-core';
import { defineComponent, h, PropType, reactive, watch } from 'vue';
import { AdvanceSearch } from './advance-search/advance-search';
import './search-form.scss';

export const SearchFormControl = defineComponent({
  name: 'IBizSearchFormControl',
  props: {
    /**
     * @description 搜索表单模型数据
     */
    modelData: {
      type: Object as PropType<IDESearchForm>,
      required: true,
    },
    /**
     * @description 应用上下文对象
     */
    context: { type: Object as PropType<IContext>, required: true },
    /**
     * @description 视图参数对象
     * @default {}
     */
    params: { type: Object as PropType<IParams>, default: () => ({}) },
    /**
     * @description 部件适配器
     */
    provider: { type: Object as PropType<IControlProvider> },
    /**
     * @description 是否是简单模式，即直接传入数据，不加载数据
     */
    isSimple: { type: Boolean, required: false },
    /**
     * @description 简单模式下传入的数据
     */
    data: { type: Object as PropType<IData>, required: false },
    /**
     * @description 是否默认加载数据
     * @default true
     */
    loadDefault: { type: Boolean, default: true },
  },
  setup(props) {
    const c = useControlController(
      (...args) => new SearchFormController(...args),
    );
    const ns = useNamespace(`control-${c.model.controlType!.toLowerCase()}`);

    if (props.isSimple) {
      c.evt.on('onMounted', () => {
        // 第一次data直接赋值，后面默认加载会走load
        c.setSimpleData(props.data || {});
      });
      watch(
        () => props.data,
        newVal => {
          const changeVal = newVal || {};
          // 找有没有不一致的属性
          const find = Object.keys(c.data).find(key => {
            return changeVal[key] !== c.data[key];
          });
          // 内外部数据不一致时，只能是外部修改了，这是更新数据并重走load
          if (find) {
            c.setSimpleData(changeVal);
          }
        },
        { deep: true },
      );
    }

    c.evt.on('onCreated', () => {
      // 表单成员state响应式
      const keys = Object.keys(c.details);
      keys.forEach(key => {
        const detail = c.details[key];
        detail.state = reactive(detail.state);
      });
    });

    const openAdvanceSearch = async () => {
      const overlay = ibiz.overlay.createModal(
        (modal: IModal) => {
          return h(AdvanceSearch, {
            controller: c,
            modal,
          });
        },
        {},
        {
          width: '800px',
          height: 'auto',
          closeOnClickModal: false,
        } as any,
      );
      overlay.present();
      await overlay.onWillDismiss();
    };

    c.evt.on('openAdvanceSearch', () => openAdvanceSearch());

    return { c, ns };
  },

  render() {
    const { state } = this.c;
    if (!state.isCreated) {
      return;
    }
    return (
      <iBizFormControl
        class={[this.ns.b()]}
        controller={this.c}
        onKeyup={(e: KeyboardEvent): Promise<void> => this.c.onKeyUp(e)}
      >
        {{
          ...this.$slots,
        }}
      </iBizFormControl>
    );
  },
});
