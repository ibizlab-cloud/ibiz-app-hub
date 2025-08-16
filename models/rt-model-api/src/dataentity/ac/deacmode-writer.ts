import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../../model-object-writer';

export class DEACModeWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEACMode = src

    _.w(d, 'actype', s, 'aCType', 'AUTOCOMPLETE');
    _.w(d, 'codeName', s);
    _.w(d, 'emptyText', s);
    _.v(
      d,
      'emptyTextLanguageRes',
      c.s('res.LanguageRes[]', s, 'getEmptyTextPSLanguageRes'),
    );
    _.x(d, 'itemSysPFPluginId', s, 'getItemPSSysPFPlugin');
    _.w(d, 'logicName', s);
    _.w(d, 'minorSortDir', s);
    _.v(
      d,
      'deacmodeDataItems',
      c.m('dataentity.ac.DEACModeDataItem[]', s, 'getPSDEACModeDataItems'),
    );
    _.v(
      d,
      'deuiactionGroup',
      c.s('dataentity.uiaction.DEUIActionGroup[]', s, 'getPSDEUIActionGroup'),
    );
    _.w(d, 'pagingMode', s, '', 0);
    _.w(d, 'pagingSize', s);
    _.w(d, 'defaultMode', s);
    _.w(d, 'enableBackend', s);
    _.w(d, 'enablePagingBar', s);

    //let iPSAppDEACMode = src

    _.v(
      d,
      'itemLayoutPanel',
      c.s('control.panel.LayoutPanel[]', s, 'getItemPSLayoutPanel'),
    );
    _.x(d, 'linkAppViewId', s, 'getLinkPSAppView');
    _.x(d, 'minorSortAppDEFieldId', s, 'getMinorSortPSAppDEField');
    _.x(d, 'appDEDataSetId', s, 'getPSAppDEDataSet');
    _.x(d, 'appDataEntityId', s, 'getPSAppDataEntity');
    _.x(d, 'pickupAppViewId', s, 'getPickupPSAppView');
    _.x(d, 'textAppDEFieldId', s, 'getTextPSAppDEField');
    _.x(d, 'valueAppDEFieldId', s, 'getValuePSAppDEField');

    super.onFillDSL(c, s, d);
  }
}
