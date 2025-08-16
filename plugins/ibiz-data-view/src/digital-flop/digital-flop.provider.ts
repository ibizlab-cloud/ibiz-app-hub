import { ISpan } from '@ibiz/model-core';
import {
  IEditorContainerController,
  IEditorProvider,
} from '@ibiz-template/runtime';
import { DigitalFlopController } from './digital-flop.controller';

/**
 * @description 数字表
 * @export
 * @class DigitalFlopProvider
 * @implements {IEditorProvider}
 */
export class DigitalFlopProvider implements IEditorProvider {
  formEditor: string = 'DigitalFlop';

  gridEditor: string = 'DigitalFlop';

  async createController(
    editorModel: ISpan,
    parentController: IEditorContainerController,
  ): Promise<DigitalFlopController> {
    const c = new DigitalFlopController(editorModel, parentController);
    await c.init();
    return c;
  }
}
