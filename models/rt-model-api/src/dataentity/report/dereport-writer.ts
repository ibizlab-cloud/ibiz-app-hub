import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../../model-object-writer';

export class DEReportWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEReport = src

    _.w(d, 'codeName', s);
    _.w(d, 'contentType', s);
    _.x(d, 'sysPFPluginId', s, 'getPSSysPFPlugin');
    _.w(d, 'reportTag', s);
    _.w(d, 'reportTag2', s);
    _.w(d, 'reportType', s);
    _.w(d, 'reportUIModel', s);
    _.w(d, 'sysUniResCode', s);
    _.w(d, 'enableLog', s);
    _.w(d, 'multiPage', s);

    //let iPSAppDEReport = src

    _.x(d, 'appBICubeId', s, 'getPSAppBICube');
    _.v(d, 'appBIReport', c.s('app.bi.AppBIReport[]', s, 'getPSAppBIReport'));
    _.x(d, 'appBISchemeId', s, 'getPSAppBIScheme');
    _.x(d, 'appDEDataSetId', s, 'getPSAppDEDataSet');
    _.x(d, 'appDEDataSet2Id', s, 'getPSAppDEDataSet2');
    _.x(d, 'appDEDataSet3Id', s, 'getPSAppDEDataSet3');
    _.x(d, 'appDEDataSet4Id', s, 'getPSAppDEDataSet4');
    _.v(
      d,
      'appDEReportItems',
      c.m('app.dataentity.AppDEReportItem[]', s, 'getPSAppDEReportItems'),
    );
    _.v(
      d,
      'layoutPanel',
      c.s('control.panel.LayoutPanel[]', s, 'getPSLayoutPanel'),
    );

    super.onFillDSL(c, s, d);
  }
}
