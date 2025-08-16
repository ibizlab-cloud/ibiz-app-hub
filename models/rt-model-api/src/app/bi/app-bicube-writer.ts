import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../../model-object-writer';

export class AppBICubeWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppBICube = src

    _.w(d, 'accessKey', s);
    _.v(
      d,
      'appBICubeDimensions',
      c.m('app.bi.AppBICubeDimension[]', s, 'getPSAppBICubeDimensions'),
    );
    _.v(
      d,
      'appBICubeMeasures',
      c.m('app.bi.AppBICubeMeasure[]', s, 'getPSAppBICubeMeasures'),
    );
    _.x(d, 'appDataEntityId', s, 'getPSAppDataEntity');

    super.onFillDSL(c, s, d);
  }
}
