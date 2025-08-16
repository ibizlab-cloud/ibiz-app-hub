import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../../model-object-writer';

export class AppBIReportWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppBIReport = src

    _.w(d, 'accessKey', s);
    _.x(d, 'appBICubeId', s, 'getPSAppBICube');
    _.v(
      d,
      'appBIReportDimensions',
      c.m('app.bi.AppBIReportDimension[]', s, 'getPSAppBIReportDimensions'),
    );
    _.v(
      d,
      'appBIReportMeasures',
      c.m('app.bi.AppBIReportMeasure[]', s, 'getPSAppBIReportMeasures'),
    );
    _.x(d, 'appDataEntityId', s, 'getPSAppDataEntity');
    _.v(
      d,
      'layoutPanel',
      c.s('control.panel.LayoutPanel[]', s, 'getPSLayoutPanel'),
    );
    _.w(d, 'reportTag', s);
    _.w(d, 'reportTag2', s);
    _.w(d, 'reportUIModel', s);

    super.onFillDSL(c, s, d);
  }
}
