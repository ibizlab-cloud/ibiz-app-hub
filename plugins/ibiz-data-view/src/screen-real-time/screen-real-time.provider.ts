import { ISpan } from '@ibiz/model-core';
import {
  IEditorContainerController,
  IEditorProvider,
} from '@ibiz-template/runtime';
import { ScreenRealTimeController } from './screen-real-time.controller';

/**
 * @description 实时时间
 * @export
 * @class DigitalFlopProvider
 * @implements {IEditorProvider}
 */
export class ScreenRealTimeProvider implements IEditorProvider {
  formEditor: string = 'ScreenRealTime';

  gridEditor: string = 'ScreenRealTime';

  async createController(
    editorModel: ISpan,
    parentController: IEditorContainerController,
  ): Promise<ScreenRealTimeController> {
    const c = new ScreenRealTimeController(editorModel, parentController);
    await c.init();
    return c;
  }
}
