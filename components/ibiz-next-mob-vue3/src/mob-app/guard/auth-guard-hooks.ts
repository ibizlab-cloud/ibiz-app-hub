import { AsyncSeriesHook } from 'qx-util';

export class AuthGuardHooks {
  /**
   * 认证前
   *
   * @author chitanda
   * @date 2024-03-13 14:03:34
   * @type {AsyncSeriesHook<null>}
   */
  static beforeAuth: AsyncSeriesHook<null> = new AsyncSeriesHook();

  /**
   * 认证后
   *
   * @author chitanda
   * @date 2024-03-13 14:03:52
   * @type {AsyncSeriesHook<null>}
   */
  static afterAuth: AsyncSeriesHook<null> = new AsyncSeriesHook();
}
