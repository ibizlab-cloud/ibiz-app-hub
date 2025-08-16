import {
  IEditorContainerController,
  IEditorProvider,
} from '@ibiz-template/runtime';
import { IBarCode2DReader } from '@ibiz/model-core';
import { QrcodeEditorController } from './qrcode-editor.controller';

/**
 * 二维码阅读器编辑器适配器
 *
 * @author ljx
 * @date 2024-12-10 10:09:03
 * @export
 * @class QrcodeEditorProvider
 * @implements {EditorProvider}
 */
export class QrcodeEditorProvider implements IEditorProvider {
  formEditor: string = 'IBizQrcode';

  gridEditor: string = 'IBizQrcode';

  async createController(
    editorModel: IBarCode2DReader,
    parentController: IEditorContainerController,
  ): Promise<QrcodeEditorController> {
    const c = new QrcodeEditorController(editorModel, parentController);
    await c.init();
    return c;
  }
}
