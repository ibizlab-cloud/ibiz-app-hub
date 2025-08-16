import { Namespace } from '@ibiz-template/core';
import { IConfirmUtil, ConfirmParams } from '@ibiz-template/runtime';
import { showConfirmDialog } from 'vant';

/**
 * 确认操作框
 *
 * @author zk
 * @date 2023-12-05 10:12:05
 * @export
 * @class ConfirmUtil
 * @implements {IConfirmUtil}
 */
export class ConfirmUtil implements IConfirmUtil {
  private ns = new Namespace('confirm');

  async info(params: ConfirmParams): Promise<boolean> {
    const { title, desc, options } = params;
    return new Promise(resolve => {
      showConfirmDialog({
        title,
        message: desc,
        className: `${this.ns.b()} ${this.ns.e('info')}`,
        ...options,
      })
        .then(() => {
          resolve(true);
        })
        .catch(() => {
          resolve(false);
        });
    });
  }

  async success(params: ConfirmParams): Promise<boolean> {
    const { title, desc, options } = params;
    return new Promise(resolve => {
      showConfirmDialog({
        title,
        message: desc,
        className: `${this.ns.b()} ${this.ns.e('success')}`,
        ...options,
      })
        .then(() => {
          resolve(true);
        })
        .catch(() => {
          resolve(false);
        });
    });
  }

  async warning(params: ConfirmParams): Promise<boolean> {
    const { title, desc, options } = params;
    return new Promise(resolve => {
      showConfirmDialog({
        title,
        message: desc,
        className: `${this.ns.b()} ${this.ns.e('warning')}`,
        ...options,
      })
        .then(() => {
          resolve(true);
        })
        .catch(() => {
          resolve(false);
        });
    });
  }

  async error(params: ConfirmParams): Promise<boolean> {
    const { title, desc, options } = params;
    return new Promise(resolve => {
      showConfirmDialog({
        title,
        message: desc,
        className: `${this.ns.b()} ${this.ns.e('error')}`,
        ...options,
      })
        .then(() => {
          resolve(true);
        })
        .catch(() => {
          resolve(false);
        });
    });
  }
}
