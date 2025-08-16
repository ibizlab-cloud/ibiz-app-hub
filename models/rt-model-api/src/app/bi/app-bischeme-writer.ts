import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../../model-object-writer';

export class AppBISchemeWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppBIScheme = src

    _.v(d, 'appBICubes', c.m('app.bi.AppBICube[]', s, 'getPSAppBICubes'));
    _.v(d, 'appBIReports', c.m('app.bi.AppBIReport[]', s, 'getPSAppBIReports'));
    _.w(d, 'uniqueTag', s);

    super.onFillDSL(c, s, d);
  }
}
