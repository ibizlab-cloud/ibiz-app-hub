import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DEFormDetailWriter } from './deform-detail-writer';

export class DEFormDRUIPartWriter extends DEFormDetailWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEFormDRUIPart = src

    _.w(d, 'maskInfo', s);
    _.w(d, 'maskMode', s);
    _.v(
      d,
      'maskLanguageRes',
      c.s('res.LanguageRes[]', s, 'getMaskPSLanguageRes'),
    );
    _.x(d, 'appViewId', s, 'getPSAppView');
    _.x(d, 'deformItemUpdateId', s, 'getPSDEFormItemUpdate');
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
    _.w(d, 'paramItem', s);
    _.w(d, 'parentDataJO', s);
    _.w(d, 'refreshItems', s);
    _.w(d, 'needSave', s);
    _.w(d, 'refreshItemsSetParamOnly', s);

    super.onFillDSL(c, s, d);
  }
}
