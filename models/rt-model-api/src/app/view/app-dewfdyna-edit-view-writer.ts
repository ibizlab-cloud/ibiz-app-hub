import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { AppDEWFEditViewWriter } from './app-dewfedit-view-writer';

export class AppDEWFDynaEditViewWriter extends AppDEWFEditViewWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppDEWFDynaEditView = src

    _.v(
      d,
      'uiactionGroups',
      c.m('view.UIActionGroup[]', s, 'getPSUIActionGroups'),
    );

    super.onFillDSL(c, s, d);
  }
}
