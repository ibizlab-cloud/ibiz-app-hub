/* eslint-disable import/no-extraneous-dependencies */
import { PlatformProviderBase } from '@ibiz-template/runtime';
import * as dd from 'dingtalk-jsapi';
import { useViewStack } from '../util';

/**
 * @description 钉钉搭载平台适配器
 * @export
 * @class DingTalkPlatformProvider
 * @extends {PlatformProviderBase}
 */
export class DingTalkPlatformProvider extends PlatformProviderBase {
  /**
   * @description 设置浏览器标签页标题
   * @param {string} title
   * @memberof PlatformProviderBase
   */
  setBrowserTitle(title: string): void {
    const app = ibiz.hub.getApp();
    let tabTitle: string = '';
    if (ibiz.env.AppLabel) {
      tabTitle = ibiz.env.AppLabel;
    } else if (app.model.title) {
      tabTitle = app.model.title;
    }
    if (dd) {
      dd.setNavigationTitle({
        title: tabTitle,
      });
    } else {
      super.setBrowserTitle(title);
    }
  }

  /**
   * 返回
   *
   * @memberof DingTalkPlatformProvider
   */
  back(): void {
    const { goBack } = useViewStack();
    goBack();
  }
}
