import { PlatformProviderBase } from '@ibiz-template/runtime';
import { nextTick } from 'vue';

/**
 * @description ios搭载平台
 * @export
 * @class IosPlatformProvider
 * @extends {PlatformProviderBase}
 */
export class IosPlatformProvider extends PlatformProviderBase {
  /**
   * @description初始化
   * @return {*}  {Promise<void>}
   * @memberof IosPlatformProvider
   */
  async init(): Promise<void> {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    if (documentHeight > windowHeight) {
      // 存在安全距离
      const safeAreaBottom = documentHeight - windowHeight;
      const root: HTMLElement | null = document.querySelector('#app');
      if (root) {
        root.style.setProperty(
          '--safe-area-inset-bottom',
          `${safeAreaBottom}px`,
        );
        root.style.setProperty('--van-back-top-bottom', `80px`);
      }
    }

    // 适配IOS键盘弹出后视图偏移，隐藏后未恢复，导致高度异常
    document.addEventListener(
      'blur',
      () => {
        nextTick(() => {
          window.scrollTo(0, 0);
        });
      },
      true,
    );
  }
}
