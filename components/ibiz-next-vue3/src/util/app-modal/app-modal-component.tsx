import {
  defineComponent,
  h,
  PropType,
  reactive,
  ref,
  resolveComponent,
  VNode,
} from 'vue';
import {
  OverlayContainer,
  useNamespace,
  useUIStore,
} from '@ibiz-template/vue3-util';
import { isNumber } from 'lodash-es';
import {
  IModalData,
  IModalOptions,
  IOverlayContainer,
  Modal,
  ViewMode,
} from '@ibiz-template/runtime';
import './app-modal-component.scss';
import { calcOpenModeStyle } from '@ibiz-template/core';

export const AppModalComponent = defineComponent({
  props: {
    opts: {
      type: Object as PropType<IModalOptions>,
      default: () => ({}),
    },
  },
  setup(props, ctx) {
    const ns = useNamespace('modal');
    const isShow = ref(false);
    const { zIndex } = useUIStore();
    const modalZIndex = zIndex.increment();

    // 处理自定义样式
    const customStyle = reactive<IData>({});
    const { width, height } = props.opts;
    if (width) {
      if (isNumber(width)) {
        customStyle.width = calcOpenModeStyle(width, 'modal');
      } else {
        customStyle.width = width;
      }
    }
    if (height) {
      if (isNumber(height)) {
        customStyle.height = calcOpenModeStyle(height, 'modal');
      } else {
        customStyle.height = height;
      }
    }

    // 合并options
    const options = ref<IModalOptions>({ footerHide: true, modalClass: '' });
    if (props.opts) {
      Object.assign(options.value, props.opts);
    }

    const modal = new Modal({
      mode: options.value.isRouteModal ? ViewMode.ROUTE_MODAL : ViewMode.MODAL,
      viewUsage: 2,
      dismiss: (data: IData) => {
        zIndex.decrement();
        isShow.value = false;
        ctx.emit('dismiss', data);
      },
    });

    // Modal自身的所有关闭方式最终都走这个
    const onBeforeClose = async (done: () => void) => {
      const isClose = await modal.dismiss();
      if (isClose) {
        done();
      }
    };

    // 外部函数式调用
    const dismiss = (_data?: IModalData) => {
      modal.dismiss(_data);
    };

    const present = () => {
      isShow.value = true;
    };

    return {
      ns,
      isShow,
      options,
      modalZIndex,
      customStyle,
      modal,
      present,
      dismiss,
      onBeforeClose,
    };
  },
  render() {
    return h(
      resolveComponent('el-dialog'),
      {
        modelValue: this.isShow,
        alignCenter: true,
        class: [
          this.ns.b(),
          this.options.placement && this.ns.m(this.options.placement),
          this.options.modalClass,
        ],
        style: this.customStyle,
        zIndex: this.modalZIndex,
        beforeClose: this.onBeforeClose,
        ...this.options,
      },
      this.$slots.default?.(this.modal),
    );
  },
});

/**
 * 创建模态框
 *
 * @author chitanda
 * @date 2022-12-29 15:12:50
 * @export
 * @param {() => VNode} render
 * @param {(IModalOptions | undefined)} [opts]
 * @return {*}  {IOverlayContainer}
 */
export function createModal(
  render: () => VNode,
  opts?: IModalOptions | undefined,
): IOverlayContainer {
  return new OverlayContainer(AppModalComponent, render, opts);
}
