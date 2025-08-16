import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../../model-object-writer';

export class AppCodeListWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppCodeList = src

    _.w(d, 'allText', s);
    _.v(
      d,
      'allTextLanguageRes',
      c.s('res.LanguageRes[]', s, 'getAllTextPSLanguageRes'),
    );
    _.x(d, 'bkcolorAppDEFieldId', s, 'getBKColorPSAppDEField');
    _.x(d, 'beginValueAppDEFieldId', s, 'getBeginValuePSAppDEField');
    _.w(d, 'cacheTimeout', s);
    _.x(d, 'clsAppDEFieldId', s, 'getClsPSAppDEField');
    _.w(d, 'codeListTag', s);
    _.w(d, 'codeListType', s);
    _.w(d, 'codeName', s);
    _.x(d, 'colorAppDEFieldId', s, 'getColorPSAppDEField');
    _.w(d, 'customCond', s);
    _.x(d, 'dataAppDEFieldId', s, 'getDataPSAppDEField');
    _.x(d, 'disableAppDEFieldId', s, 'getDisablePSAppDEField');
    _.w(d, 'dynaSysMode', s, '', 0);
    _.w(d, 'emptyText', s);
    _.v(
      d,
      'emptyTextLanguageRes',
      c.s('res.LanguageRes[]', s, 'getEmptyTextPSLanguageRes'),
    );
    _.x(d, 'endValueAppDEFieldId', s, 'getEndValuePSAppDEField');
    _.x(d, 'iconClsAppDEFieldId', s, 'getIconClsPSAppDEField');
    _.x(d, 'iconClsXAppDEFieldId', s, 'getIconClsXPSAppDEField');
    _.x(d, 'iconPathAppDEFieldId', s, 'getIconPathPSAppDEField');
    _.x(d, 'iconPathXAppDEFieldId', s, 'getIconPathXPSAppDEField');
    _.w(d, 'incBeginValueMode', s, '', 0);
    _.w(d, 'incEndValueMode', s, '', 0);
    _.w(d, 'minorSortDir', s);
    _.x(d, 'minorSortAppDEFieldId', s, 'getMinorSortPSAppDEField');
    _.w(d, 'orMode', s);
    _.x(d, 'appDEDataSetId', s, 'getPSAppDEDataSet');
    _.x(d, 'appDataEntityId', s, 'getPSAppDataEntity');
    _.v(d, 'codeItems', c.m('codelist.CodeItem[]', s, 'getPSCodeItems'));
    _.x(d, 'sysPFPluginId', s, 'getPSSysPFPlugin');
    _.x(d, 'pvalueAppDEFieldId', s, 'getPValuePSAppDEField');
    _.w(d, 'predefinedType', s);
    _.x(d, 'textAppDEFieldId', s, 'getTextPSAppDEField');
    _.w(d, 'textSeparator', s);
    _.x(d, 'valueAppDEFieldId', s, 'getValuePSAppDEField');
    _.w(d, 'valueSeparator', s);
    _.w(d, 'codeItemValueNumber', s);
    _.w(d, 'enableCache', s);
    _.w(d, 'subSysAsCloud', s);
    _.w(d, 'thresholdGroup', s);

    super.onFillDSL(c, s, d);
  }
}
