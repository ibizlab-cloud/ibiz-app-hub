import { IModelDSLGenEngineContext } from '../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../model-object-writer';

export class EditorItemWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSEditorItem = src

    _.x(d, 'appDEACModeId', s, 'getPSAppDEACMode');
    _.x(d, 'appDEDataSetId', s, 'getPSAppDEDataSet');
    _.x(d, 'appDataEntityId', s, 'getPSAppDataEntity');

    //let iPSNavigateParamContainer = src

    _.v(
      d,
      'navigateContexts',
      c.m('control.NavigateContext[]', s, 'getPSNavigateContexts'),
    );
    _.v(
      d,
      'navigateParams',
      c.m('control.NavigateParam[]', s, 'getPSNavigateParams'),
    );

    super.onFillDSL(c, s, d);
  }
}
