/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IEditorContainerController,
  IEditorProvider,
} from '@ibiz-template/runtime';
import { ICheckBox } from '@ibiz/model-core';
import { SwitchEditorController } from './switch-editor.controller';

/**
 * 开关编辑器适配器
 *
 * @export
 * @class SwitchEditorProvider
 * @implements {IEditorProvider}
 */
export class SwitchEditorProvider implements IEditorProvider {
  formEditor: string = 'IBizSwitch';

  gridEditor: string = 'IBizSwitch';

  async createController(
    editorModel: ICheckBox,
    parentController: IEditorContainerController,
  ): Promise<SwitchEditorController> {
    const c = new SwitchEditorController(editorModel, parentController);
    await c.init();
    return c;
  }
}
