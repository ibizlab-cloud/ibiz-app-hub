import { IModalUtil, ModalParams } from '@ibiz-template/runtime';
import { showConfirmDialog, showDialog } from 'vant';

/**
 * 简洁确认操作框
 *
 * @author chitanda
 * @date 2022-08-17 16:08:52
 * @export
 * @class ModalUtil
 * @implements {IModalUtil}
 */
export class ModalUtil implements IModalUtil {
  async info(params: ModalParams): Promise<void> {
    const { confirmButtonText, cancelButtonText } = params;
    await showDialog({
      title: params.title,
      message: params.desc,
      confirmButtonText,
      cancelButtonText,
    });
  }

  async success(params: ModalParams): Promise<void> {
    const { confirmButtonText, cancelButtonText } = params;
    await showDialog({
      title: params.title,
      message: params.desc,
      confirmButtonColor: '#07c160',
      confirmButtonText,
      cancelButtonText,
    });
  }

  async warning(params: ModalParams): Promise<void> {
    const { confirmButtonText, cancelButtonText } = params;
    await showDialog({
      title: params.title,
      message: params.desc,
      confirmButtonColor: '#faab0c',
      confirmButtonText,
      cancelButtonText,
    });
  }

  async error(params: ModalParams): Promise<void> {
    const { confirmButtonText, cancelButtonText } = params;
    await showDialog({
      title: params.title,
      message: params.desc,
      theme: 'round-button',
      confirmButtonText,
      cancelButtonText,
    });
  }

  async confirm(params: ModalParams): Promise<boolean> {
    const { confirmButtonText, cancelButtonText } = params;
    return new Promise(resolve => {
      showConfirmDialog({
        title: params.title,
        message: params.desc,
        confirmButtonText,
        cancelButtonText,
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
