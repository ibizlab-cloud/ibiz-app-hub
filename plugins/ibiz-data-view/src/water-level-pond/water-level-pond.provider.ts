/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IEditorContainerController,
  IEditorProvider,
} from '@ibiz-template/runtime';
import { ISlider } from '@ibiz/model-core';
import { WaterLevelPondController } from './water-level-pond.controller';

/**
 * 水位图适配器
 *
 * @export
 * @class WaterLevelPondProvider
 * @implements {EditorProvider}
 */
export class WaterLevelPondProvider implements IEditorProvider {
  formEditor: string = 'WaterLevelPond';

  gridEditor: string = 'WaterLevelPond';

  async createController(
    editorModel: ISlider,
    parentController: IEditorContainerController,
  ): Promise<WaterLevelPondController> {
    const c = new WaterLevelPondController(editorModel, parentController);
    await c.init();
    return c;
  }
}
