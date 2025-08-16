import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { AppDEMobWFEditViewWriter } from './app-demob-wfedit-view-writer';

export class AppDEMobWFDynaEditViewWriter extends AppDEMobWFEditViewWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppDEMobWFDynaEditView = src

    _.v(
      d,
      'uiactionGroups',
      c.m('view.UIActionGroup[]', s, 'getPSUIActionGroups'),
    );

    super.onFillDSL(c, s, d);
  }
}
