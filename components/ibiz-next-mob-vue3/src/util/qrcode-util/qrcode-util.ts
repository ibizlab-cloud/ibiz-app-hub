import { IQrcodeUtil } from '@ibiz-template/runtime';
import QRCodeStyling from 'qr-code-styling';
import { createScanQrcode } from '../scan-qrcode/scan-qrcode';

/**
 * 二维码工具类
 *
 * @description 此实现类挂载在 ibiz.qrcodeUtil
 * @author ljx
 * @date 2024-12-10 10:12:50
 * @export
 * @class QrcodeUtil
 * @implements {IQrcodeUtil}
 */
export class QrcodeUtil implements IQrcodeUtil {
  async scanQrcode(options?: IParams | undefined): Promise<IData> {
    const overlay = createScanQrcode(options);
    return overlay.onWillDismiss();
  }

  createQrcode(value: string, options?: IParams | undefined): IParams {
    return new QRCodeStyling({
      data: unescape(encodeURIComponent(value)),
      ...options,
    });
  }
}
