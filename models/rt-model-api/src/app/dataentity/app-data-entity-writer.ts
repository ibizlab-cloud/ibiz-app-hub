import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../../model-object-writer';

export class AppDataEntityWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppDataEntity = src

    _.v(
      d,
      'appDEACModes',
      c.m('app.dataentity.AppDEACMode[]', s, 'getAllPSAppDEACModes'),
    );
    _.v(
      d,
      'appDEDataExports',
      c.m('app.dataentity.AppDEDataExport[]', s, 'getAllPSAppDEDataExports'),
    );
    _.v(
      d,
      'appDEDataImports',
      c.m('app.dataentity.AppDEDataImport[]', s, 'getAllPSAppDEDataImports'),
    );
    _.v(
      d,
      'appDEFields',
      c.m('app.dataentity.AppDEField[]', s, 'getAllPSAppDEFields'),
    );
    _.v(
      d,
      'appDELogics',
      c.m('app.dataentity.AppDELogic[]', s, 'getAllPSAppDELogics'),
    );
    _.v(
      d,
      'appDEMaps',
      c.m('app.dataentity.AppDEMap[]', s, 'getAllPSAppDEMaps'),
    );
    _.v(
      d,
      'appDEMethodDTOs',
      c.m('app.dataentity.AppDEMethodDTO[]', s, 'getAllPSAppDEMethodDTOs'),
    );
    _.v(
      d,
      'appDEMethods',
      c.m('app.dataentity.AppDEMethod[]', s, 'getAllPSAppDEMethods'),
    );
    _.v(
      d,
      'appDEPrints',
      c.m('app.dataentity.AppDEPrint[]', s, 'getAllPSAppDEPrints'),
    );
    _.v(
      d,
      'appDEUIActions',
      c.m('app.dataentity.AppDEUIAction[]', s, 'getAllPSAppDEUIActions'),
    );
    _.v(
      d,
      'appDEUILogics',
      c.m('app.dataentity.AppDEUILogic[]', s, 'getAllPSAppDEUILogics'),
    );
    _.v(
      d,
      'appPortletCats',
      c.m('app.control.AppPortletCat[]', s, 'getAllPSAppPortletCats'),
    );
    _.v(
      d,
      'demainStates',
      c.m('dataentity.mainstate.DEMainState[]', s, 'getAllPSDEMainStates'),
    );
    _.v(
      d,
      'deopprivs',
      c.m('dataentity.priv.DEOPPriv[]', s, 'getAllPSDEOPPrivs'),
    );
    _.w(d, 'codeName', s);
    _.w(d, 'codeName2', s);
    _.w(d, 'deapicodeName', s, 'dEAPICodeName');
    _.w(d, 'deapicodeName2', s, 'dEAPICodeName2');
    _.w(d, 'deapitag', s, 'dEAPITag');
    _.w(d, 'decodeName', s, 'dECodeName');
    _.w(d, 'defgroupMode', s, 'dEFGroupMode');
    _.w(d, 'defullTag', s, 'dEFullTag');
    _.w(d, 'dename', s, 'dEName');
    _.w(d, 'dataAccCtrlArch', s);
    _.w(d, 'dataAccCtrlMode', s);
    _.x(d, 'dataTypeAppDEFieldId', s, 'getDataTypePSAppDEField');
    _.x(d, 'defaultAppDEDataExportId', s, 'getDefaultPSAppDEDataExport');
    _.x(d, 'defaultAppDEDataImportId', s, 'getDefaultPSAppDEDataImport');
    _.x(d, 'defaultAppDEPrintId', s, 'getDefaultPSAppDEPrint');
    _.w(d, 'dynaSysMode', s, '', 0);
    _.w(d, 'enableUIActions', s);
    _.x(d, 'formTypeAppDEFieldId', s, 'getFormTypePSAppDEField');
    _.x(d, 'indexTypeAppDEFieldId', s, 'getIndexTypePSAppDEField');
    _.x(d, 'keyAppDEFieldId', s, 'getKeyPSAppDEField');
    _.v(d, 'lnlanguageRes', c.s('res.LanguageRes[]', s, 'getLNPSLanguageRes'));
    _.w(d, 'logicName', s);
    _.y(d, 'mainStateAppDEFieldIds', s, 'getMainStatePSAppDEFields');
    _.x(d, 'majorAppDEFieldId', s, 'getMajorPSAppDEField');
    _.v(
      d,
      'minorAppDERSs',
      c.m('app.dataentity.AppDERS[]', s, 'getMinorPSAppDERSs'),
    );
    _.x(d, 'orgIdAppDEFieldId', s, 'getOrgIdPSAppDEField');
    _.v(d, 'sysImage', c.s('res.SysImage[]', s, 'getPSSysImage'));
    _.y(d, 'quickSearchAppDEFieldIds', s, 'getQuickSearchPSAppDEFields');
    _.w(d, 'requestPaths', s, 'requestPaths');
    _.w(d, 'storageMode', s);
    _.w(d, 'sysAPITag', s);
    _.y(d, 'unionKeyValueAppDEFieldIds', s, 'getUnionKeyValuePSAppDEFields');
    _.w(d, 'defaultMode', s);
    _.w(d, 'enableDEMainState', s);
    _.w(d, 'enableFilterActions', s);
    _.w(d, 'enableTempData', s);
    _.w(d, 'enableWFActions', s);
    _.w(d, 'major', s);

    super.onFillDSL(c, s, d);
  }
}
