import { RuntimeError } from '@ibiz-template/core';
import { IMessageParams, IMessageUtil } from '@ibiz-template/runtime';
import { showNotify } from 'vant';

/**
 * 消息通知
 *
 * @author chitanda
 * @date 2022-08-17 16:08:24
 * @export
 * @class MessageUtil
 * @implements {IMessageUtil}
 */
export class MessageUtil implements IMessageUtil {
  info(msg: string, duration?: number, _closable?: boolean): void {
    showNotify({
      message: msg,
      duration: duration != null ? duration * 1000 : 1500,
      type: 'primary',
    });
  }

  success(msg: string, duration?: number, _closable?: boolean): void {
    showNotify({
      message: msg,
      duration: duration != null ? duration * 1000 : 1500,
      type: 'success',
    });
  }

  warning(msg: string, duration?: number, _closable?: boolean): void {
    // todo vant 暂无 warning toast
    showNotify({
      message: msg,
      duration: duration != null ? duration * 1000 : 1500,
      type: 'warning',
    });
  }

  error(msg: string, duration?: number, _closable?: boolean): void {
    showNotify({
      message: msg,
      duration: duration != null ? duration * 1000 : 1500,
      type: 'danger',
    });
  }

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  notice(params: IMessageParams): void {
    throw new RuntimeError(ibiz.i18n.t('util.notAchieved'));
  }
}
