import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ControlItemWriter2 } from '../control-item-writer2';

export class SysCalendarItemWriter extends ControlItemWriter2 {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSSysCalendarItem = src

    _.w(d, 'bkcolor', s, 'bKColor');
    _.x(d, 'bkcolorAppDEFieldId', s, 'getBKColorPSAppDEField');
    _.x(d, 'beginTimeAppDEFieldId', s, 'getBeginTimePSAppDEField');
    _.x(d, 'clsAppDEFieldId', s, 'getClsPSAppDEField');
    _.w(d, 'color', s);
    _.x(d, 'colorAppDEFieldId', s, 'getColorPSAppDEField');
    _.x(d, 'contentAppDEFieldId', s, 'getContentPSAppDEField');
    _.x(d, 'createAppDEActionId', s, 'getCreatePSAppDEAction');
    _.x(d, 'createDEOPPrivId', s, 'getCreatePSDEOPPriv');
    _.w(d, 'customCond', s);
    _.x(d, 'data2AppDEFieldId', s, 'getData2PSAppDEField');
    _.x(d, 'dataAppDEFieldId', s, 'getDataPSAppDEField');
    _.w(d, 'dynaClass', s);
    _.x(d, 'endTimeAppDEFieldId', s, 'getEndTimePSAppDEField');
    _.x(d, 'iconAppDEFieldId', s, 'getIconPSAppDEField');
    _.x(d, 'idAppDEFieldId', s, 'getIdPSAppDEField');
    _.w(d, 'itemStyle', s);
    _.w(d, 'itemType', s);
    _.x(d, 'levelAppDEFieldId', s, 'getLevelPSAppDEField');
    _.x(d, 'linkAppDEFieldId', s, 'getLinkPSAppDEField');
    _.w(d, 'maxSize', s);
    _.w(d, 'modelObj', s);
    _.v(
      d,
      'nameLanguageRes',
      c.s('res.LanguageRes[]', s, 'getNamePSLanguageRes'),
    );
    _.x(d, 'appDEDataSetId', s, 'getPSAppDEDataSet');
    _.v(
      d,
      'decontextMenu',
      c.s('control.toolbar.DEContextMenu[]', s, 'getPSDEContextMenu'),
    );
    _.v(
      d,
      'layoutPanel',
      c.s('control.panel.LayoutPanel[]', s, 'getPSLayoutPanel'),
    );
    _.v(d, 'sysCss', c.s('res.SysCss[]', s, 'getPSSysCss'));
    _.v(d, 'sysImage', c.s('res.SysImage[]', s, 'getPSSysImage'));
    _.x(d, 'sysPFPluginId', s, 'getPSSysPFPlugin');
    _.x(d, 'uiactionId', s, 'getPSUIAction');
    _.x(d, 'removeAppDEActionId', s, 'getRemovePSAppDEAction');
    _.x(d, 'removeDEOPPrivId', s, 'getRemovePSDEOPPriv');
    _.x(d, 'tag2AppDEFieldId', s, 'getTag2PSAppDEField');
    _.x(d, 'tagAppDEFieldId', s, 'getTagPSAppDEField');
    _.x(d, 'textAppDEFieldId', s, 'getTextPSAppDEField');
    _.x(d, 'tipsAppDEFieldId', s, 'getTipsPSAppDEField');
    _.x(d, 'updateAppDEActionId', s, 'getUpdatePSAppDEAction');
    _.x(d, 'updateDEOPPrivId', s, 'getUpdatePSDEOPPriv');
    _.w(d, 'enableEdit', s);
    _.w(d, 'enableQuickCreate', s);

    //let iPSControlXDataContainer = src

    _.x(d, 'appDataEntityId', s, 'getPSAppDataEntity');

    super.onFillDSL(c, s, d);
  }
}
