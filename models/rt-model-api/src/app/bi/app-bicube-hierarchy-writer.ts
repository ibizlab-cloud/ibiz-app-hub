import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../../model-object-writer';

export class AppBICubeHierarchyWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppBICubeHierarchy = src

    _.w(d, 'caption', s);
    _.w(d, 'hierarchyTag', s);
    _.w(d, 'hierarchyTag2', s);
    _.v(
      d,
      'appBICubeLevels',
      c.m('app.bi.AppBICubeLevel[]', s, 'getPSAppBICubeLevels'),
    );
    _.x(d, 'appDataEntityId', s, 'getPSAppDataEntity');
    _.w(d, 'hasAll', s);

    super.onFillDSL(c, s, d);
  }
}
