/* eslint-disable no-unused-vars */

import { IReportChartProvider } from '../interface';

/* eslint-disable @typescript-eslint/no-explicit-any */
type NewProvider = (...args: any[]) => IReportChartProvider;

/**
 * 适配器注册中心
 *
 * @author tony001
 * @date 2024-05-21 15:05:08
 * @export
 * @class RegisterCenter
 */
export class RegisterCenter {
  /**
   * 适配器存储Map
   *
   * @author tony001
   * @date 2024-05-21 15:05:30
   * @protected
   * @type {Map<string, NewProvider>}
   */
  protected providers: Map<string, NewProvider> = new Map();

  /**
   * 注册适配器
   *
   * @author tony001
   * @date 2024-05-21 15:05:47
   * @param {string} key
   * @param {NewProvider} newProvider
   */
  register(key: string, newProvider: NewProvider): void {
    this.providers.set(key, newProvider);
  }

  /**
   * 注销适配器
   *
   * @author tony001
   * @date 2024-05-21 15:05:22
   * @param {string} key
   */
  unRegister(key: string): void {
    this.providers.delete(key);
  }

  /**
   * 获取注册器
   *
   * @author tony001
   * @date 2024-05-21 15:05:53
   * @param {string} key
   * @param {...Parameters<NewProvider>} args
   * @return {*}  {(IReportChartProvider | undefined)}
   */
  get(
    key: string,
    ...args: Parameters<NewProvider>
  ): IReportChartProvider | undefined {
    const func = this.providers.get(key);
    if (func) {
      return func(...args);
    }
  }
}
