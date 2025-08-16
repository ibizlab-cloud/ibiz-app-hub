import {
  IEditorContainerController,
  IEditorProvider,
} from '@ibiz-template/runtime';
import { ISlider } from '@ibiz/model-core';
import { PercentPondController } from './percent-pond.controller';

export class PercentPondProvider implements IEditorProvider {
  formEditor: string = 'PercentPond';

  gridEditor: string = 'PercentPond';

  async createController(
    editorModel: ISlider,
    parentController: IEditorContainerController,
  ): Promise<PercentPondController> {
    const c = new PercentPondController(editorModel, parentController);
    await c.init();
    return c;
  }
}
