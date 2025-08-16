/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IEditorContainerController,
  IEditorProvider,
} from '@ibiz-template/runtime';
import { IRadioButtonList } from '@ibiz/model-core';
import { ScreenRadioListEditorController } from './screen-radio-list.controller';

/**
 * 单选框列表编辑器适配器
 *
 * @author lxm
 * @date 2022-09-19 22:09:03
 * @export
 * @class RadioButtonListEditorProvider
 * @implements {EditorProvider}
 */
export class ScreenRadioButtonListEditorProvider implements IEditorProvider {
  formEditor: string = 'ScreenRadioList';

  gridEditor: string = 'ScreenRadioList';

  async createController(
    editorModel: IRadioButtonList,
    parentController: IEditorContainerController,
  ): Promise<ScreenRadioListEditorController> {
    const c = new ScreenRadioListEditorController(
      editorModel,
      parentController,
    );
    await c.init();
    return c;
  }
}
