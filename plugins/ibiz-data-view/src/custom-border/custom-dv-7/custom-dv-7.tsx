/* eslint-disable vue/require-prop-types */
import {
  defineComponent,
  getCurrentInstance,
  onBeforeUnmount,
  onMounted,
  ref,
} from 'vue';
import { useNamespace } from '@ibiz-template/vue3-util';
import { debounce } from '@ibiz-template/core';
import { observerDomResize } from '../../util';
import './custom-dv-7.scss';

export const CustomDV7 = defineComponent({
  name: 'CustomDV7',
  props: {
    offsetX: {
      style: Number,
      default: 0,
    },
    offsetY: {
      style: Number,
      default: 0,
    },
  },
  setup(props) {
    const ns = useNamespace('custom-border');
    const width = ref(0);
    const height = ref(0);
    const myElement = ref();
    const mergedColor = 'var(--ibiz-screen-dashboard-border-color)';
    let debounceInitWHFun:
      | MutationCallback
      | EventListenerOrEventListenerObject;
    let domObserver: MutationObserver | null;

    /**
     *  初始化宽高
     * @param resize
     * @returns
     */
    const initWH = () => {
      const dom = myElement.value;
      if (dom) {
        width.value = dom ? dom.offsetWidth : 0;
        height.value = dom ? dom.offsetHeight : 0;
      }
    };

    /**
     * 重绘宽高防抖
     */
    const getDebounceInitWHFun = () => {
      debounceInitWHFun = debounce(initWH, 100);
    };

    /**
     * 绑定dom重绘回调
     */
    const bindDomResizeCallback = () => {
      const dom = myElement.value;
      domObserver = observerDomResize(
        dom,
        debounceInitWHFun as MutationCallback,
      );

      window.addEventListener(
        'resize',
        debounceInitWHFun as EventListenerOrEventListenerObject,
      );
    };

    /**
     *  解绑dom重绘回调
     * @returns
     */
    const unbindDomResizeCallback = () => {
      if (!domObserver) return;

      domObserver.disconnect();
      domObserver.takeRecords();
      domObserver = null;
      window.removeEventListener(
        'resize',
        debounceInitWHFun as EventListenerOrEventListenerObject,
      );
    };

    /**
     * 绘制边框
     */
    const renderBorder = () => {
      const _width = width.value - props.offsetX;
      const _height = height.value - props.offsetY;
      const padding = 8;
      const offset = 25;
      const minOffset = 10;
      return (
        <svg
          class={[ns.e('svg-container')]}
          width={_width}
          height={_height}
          style={`--ibiz-style-7-offsetY:${props.offsetY}px`}
        >
          <polyline
            class='dv-bb7-line-width-2'
            stroke={mergedColor}
            points={`${padding}, ${padding + offset} ${padding}, ${padding} ${padding + offset}, ${padding}`}
          />
          <polyline
            class='dv-bb7-line-width-2'
            stroke={mergedColor}
            points={`${_width - offset - padding}, ${padding} ${_width - padding}, ${padding} ${_width - padding}, ${padding + offset}`}
          />
          <polyline
            class='dv-bb7-line-width-2'
            stroke={mergedColor}
            points={`${
              _width - offset - padding
            }, ${_height - padding} ${_width - padding}, ${_height - padding} ${_width - padding}, ${_height - offset - padding}`}
          />
          <polyline
            class='dv-bb7-line-width-2'
            stroke={mergedColor}
            points={`${padding}, ${_height - offset - padding} ${padding}, ${_height - padding} ${offset + padding}, ${_height - padding}`}
          />
          <polyline
            class='dv-bb7-line-width-5'
            stroke={mergedColor}
            points={`${padding}, ${minOffset + padding} ${padding}, ${padding} ${minOffset + padding}, ${padding}`}
          />
          <polyline
            class='dv-bb7-line-width-5'
            stroke={mergedColor}
            points={`${_width - minOffset - padding}, ${padding} ${_width - padding}, ${padding} ${_width - padding}, ${minOffset + padding}`}
          />
          <polyline
            class='dv-bb7-line-width-5'
            stroke={mergedColor}
            points={`${
              _width - minOffset - padding
            }, ${_height - padding} ${_width - padding}, ${_height - padding} ${_width - padding}, ${_height - minOffset - padding}`}
          />
          <polyline
            class='dv-bb7-line-width-5'
            stroke={mergedColor}
            points={`${padding}, ${_height - minOffset - padding} ${padding}, ${_height - padding} ${padding + minOffset}, ${_height - padding}`}
          />
        </svg>
      );
    };

    /**
     * 初始化
     */
    const autoResizeMixinInit = async () => {
      await initWH();

      getDebounceInitWHFun();

      bindDomResizeCallback();

      const _vm = getCurrentInstance();

      if (
        _vm &&
        typeof (_vm as IParams).afterAutoResizeMixinInit === 'function'
      )
        (_vm as IParams).afterAutoResizeMixinInit();
    };

    onMounted(() => {
      autoResizeMixinInit();
    });

    onBeforeUnmount(() => {
      unbindDomResizeCallback();
    });

    return {
      renderBorder,
      ns,
      myElement,
      mergedColor,
    };
  },
  render() {
    return (
      <div
        class={[this.ns.b(), this.ns.is('style-7', true)]}
        ref={el => {
          this.myElement = el;
        }}
      >
        {this.renderBorder()}
        <div class={this.ns.e('content')}>{this.$slots.default?.()}</div>
      </div>
    );
  },
});
