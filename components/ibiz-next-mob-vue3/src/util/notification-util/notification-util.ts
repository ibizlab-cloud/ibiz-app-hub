/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  INotificationUtil,
  IUploadManagerParams,
  NotificationParams,
} from '@ibiz-template/runtime';
import { showNotify } from 'vant';

/**
 * 在界面右上角显示可关闭的全局通知
 *
 * @author chitanda
 * @date 2022-08-17 16:08:26
 * @export
 * @class NotificationUtil
 * @implements {INotificationUtil}
 */
export class NotificationUtil implements INotificationUtil {
  uploadManager(params: IUploadManagerParams): Promise<IData[]> {
    throw new Error('Method not implemented.');
  }

  default(_params: NotificationParams): void {
    throw new Error(ibiz.i18n.t('util.unrealized'));
  }

  info(params: NotificationParams): void {
    const duration = params.duration ? params.duration * 1000 : 4500;
    showNotify({
      message: params.desc,
      type: 'primary',
      duration,
    });
  }

  success(params: NotificationParams): void {
    const duration = params.duration ? params.duration * 1000 : 4500;
    showNotify({
      message: params.desc,
      type: 'success',
      duration,
    });
  }

  warning(params: NotificationParams): void {
    const duration = params.duration ? params.duration * 1000 : 4500;
    showNotify({
      message: params.desc,
      type: 'warning',
      duration,
    });
  }

  error(params: NotificationParams): void {
    const duration = params.duration ? params.duration * 1000 : 4500;
    showNotify({
      message: params.desc,
      type: 'danger',
      duration,
    });
  }
}
