import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ControlItemWriter2 } from '../control-item-writer2';

export class SysMapItemWriter extends ControlItemWriter2 {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSSysMapItem = src

    _.x(d, 'altitudeAppDEFieldId', s, 'getAltitudePSAppDEField');
    _.w(d, 'bkcolor', s, 'bKColor');
    _.x(d, 'bkcolorAppDEFieldId', s, 'getBKColorPSAppDEField');
    _.w(d, 'borderColor', s);
    _.w(d, 'borderWidth', s);
    _.x(d, 'clsAppDEFieldId', s, 'getClsPSAppDEField');
    _.w(d, 'color', s);
    _.x(d, 'colorAppDEFieldId', s, 'getColorPSAppDEField');
    _.x(d, 'contentAppDEFieldId', s, 'getContentPSAppDEField');
    _.w(d, 'customCond', s);
    _.x(d, 'data2AppDEFieldId', s, 'getData2PSAppDEField');
    _.x(d, 'dataAppDEFieldId', s, 'getDataPSAppDEField');
    _.w(d, 'dynaClass', s);
    _.x(d, 'groupAppDEFieldId', s, 'getGroupPSAppDEField');
    _.x(d, 'iconAppDEFieldId', s, 'getIconPSAppDEField');
    _.x(d, 'idAppDEFieldId', s, 'getIdPSAppDEField');
    _.w(d, 'itemStyle', s);
    _.w(d, 'itemType', s);
    _.x(d, 'latitudeAppDEFieldId', s, 'getLatitudePSAppDEField');
    _.x(d, 'linkAppDEFieldId', s, 'getLinkPSAppDEField');
    _.x(d, 'longitudeAppDEFieldId', s, 'getLongitudePSAppDEField');
    _.w(d, 'maxSize', s);
    _.w(d, 'modelObj', s);
    _.v(
      d,
      'nameLanguageRes',
      c.s('res.LanguageRes[]', s, 'getNamePSLanguageRes'),
    );
    _.x(d, 'orderValueAppDEFieldId', s, 'getOrderValuePSAppDEField');
    _.x(d, 'appDEDataSetId', s, 'getPSAppDEDataSet');
    _.x(d, 'appDataEntityId', s, 'getPSAppDataEntity');
    _.v(
      d,
      'decontextMenu',
      c.s('control.toolbar.DEContextMenu[]', s, 'getPSDEContextMenu'),
    );
    _.v(d, 'sysCss', c.s('res.SysCss[]', s, 'getPSSysCss'));
    _.v(d, 'sysImage', c.s('res.SysImage[]', s, 'getPSSysImage'));
    _.w(d, 'radius', s);
    _.x(d, 'removeAppDEActionId', s, 'getRemovePSAppDEAction');
    _.x(d, 'removeDEOPPrivId', s, 'getRemovePSDEOPPriv');
    _.x(d, 'shapeClsAppDEFieldId', s, 'getShapeClsPSAppDEField');
    _.w(d, 'shapeDynaClass', s);
    _.v(d, 'shapeSysCss', c.s('res.SysCss[]', s, 'getShapePSSysCss'));
    _.x(d, 'tag2AppDEFieldId', s, 'getTag2PSAppDEField');
    _.x(d, 'tagAppDEFieldId', s, 'getTagPSAppDEField');
    _.x(d, 'textAppDEFieldId', s, 'getTextPSAppDEField');
    _.x(d, 'timeAppDEFieldId', s, 'getTimePSAppDEField');
    _.x(d, 'tipsAppDEFieldId', s, 'getTipsPSAppDEField');
    _.w(d, 'enableQuickCreate', s);

    //let iPSControlXDataContainer = src

    super.onFillDSL(c, s, d);
  }
}
