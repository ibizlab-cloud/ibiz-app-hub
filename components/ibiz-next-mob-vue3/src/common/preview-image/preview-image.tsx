import { useNamespace } from '@ibiz-template/vue3-util';
import { defineComponent, ref, onMounted, onUnmounted, Ref } from 'vue';
import './preview-image.scss';
import { listenJSEvent, NOOP } from '@ibiz-template/core';

export const IBizPreviewImage = defineComponent({
  name: 'IBizPreviewImage',
  props: {
    url: {
      type: String,
      required: true,
    },
  },
  setup() {
    const ns = useNamespace('preview-image');
    const show: Ref<boolean> = ref(true);
    const imageRef = ref();

    let startCleanup = NOOP;
    let moveCleanup = NOOP;
    let endCleanup = NOOP;

    // 拖动相关
    let startPoint = { x: 0, y: 0 }; // 记录初始触摸点位
    let isTouching = false; // 标记是否正在移动
    let offset = { left: 0, top: 0 };
    // 缩放相关
    let lastDistance = 0;
    let lastScale = 1; // 记录下最后的缩放值
    let scale = 1;
    let origin = 'center';
    let scaleOrigin = { x: 0, y: 0 };

    // 获取两点之间距离
    const getDistance = (start: IData, end: IData) => {
      return Math.hypot(end.pageX - start.pageX, end.pageY - start.pageY);
    };

    // 获取缩放中心点
    const getOffsetCorrection = (start: IData, end: IData) => {
      const x = (start.pageX + end.pageX) / 2;
      const y = (start.pageY + end.pageY) / 2;
      origin = `${x}px ${y}px`;
      const offsetLeft = (scale - 1) * (x - scaleOrigin.x) + offset.left;
      const offsetTop = (scale - 1) * (y - scaleOrigin.y) + offset.top;
      scaleOrigin = { x, y };
      return { left: offsetLeft, top: offsetTop };
    };

    const changeStyle = (el: HTMLElement, arr: string[]) => {
      const original = el.style.cssText.split(';');
      original.pop();
      el.style.cssText = `${original.concat(arr).join(';')};`;
    };

    onMounted(() => {
      if (imageRef.value) {
        const el = imageRef.value.$el;
        startCleanup = listenJSEvent(el, 'touchstart', event => {
          event.preventDefault();
          isTouching = true;
          const touches = event.touches;
          if (touches.length === 2) {
            // 双指缩放
            lastDistance = getDistance(touches[0], touches[1]);
            lastScale = scale;
          } else if (touches.length === 1) {
            // 单指拖动
            startPoint = { x: touches[0].clientX, y: touches[0].clientY };
          }
        });
        moveCleanup = listenJSEvent(el, 'touchmove', event => {
          if (!isTouching) {
            return;
          }
          const touches = event.touches;
          if (touches.length === 2) {
            const ratio = getDistance(touches[0], touches[1]) / lastDistance;
            scale = ratio * lastScale;
            offset = getOffsetCorrection(touches[0], touches[1]);
            changeStyle(el, [
              'transition: all 0s',
              `transform: translate(${`${offset.left}px`}, ${`${offset.top}px`}) scale(${scale})`,
              `transform-origin: ${origin}`,
            ]);
          } else if (touches.length === 1) {
            // 单指拖动
            offset = {
              left: offset.left + (touches[0].clientX - startPoint.x),
              top: offset.top + (touches[0].clientY - startPoint.y),
            };
            changeStyle(el, [
              'transition: all 0s',
              `transform: translate(${`${offset.left}px`}, ${`${offset.top}px`}) scale(${scale})`,
              `transform-origin: ${origin}`,
            ]);
            // 注意移动完也要更新初始点位，否则图片会加速逃逸可视区域
            startPoint = { x: touches[0].clientX, y: touches[0].clientY };
          }
        });
        endCleanup = listenJSEvent(el, 'touchend', () => {
          isTouching = false;
        });
      }
    });

    onUnmounted(() => {
      if (startCleanup !== NOOP) {
        startCleanup();
      }
      if (moveCleanup !== NOOP) {
        moveCleanup();
      }
      if (endCleanup !== NOOP) {
        endCleanup();
      }
    });

    return {
      ns,
      show,
      imageRef,
    };
  },
  render() {
    return (
      <div class={this.ns.b()}>
        <van-image ref='imageRef' src={this.url} />
      </div>
    );
  },
});
