import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { UIActionWriter } from '../../view/uiaction-writer';

export class DEUIActionWriter extends UIActionWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEUIAction = src

    _.w(d, 'actionLevel', s, '', 100);
    _.w(d, 'actionTarget', s);
    _.w(d, 'buttonStyle', s, '', 'DEFAULT');
    _.v(d, 'cmlanguageRes', c.s('res.LanguageRes[]', s, 'getCMPSLanguageRes'));
    _.v(
      d,
      'capLanguageRes',
      c.s('res.LanguageRes[]', s, 'getCapPSLanguageRes'),
    );
    _.w(d, 'caption', s);
    _.w(d, 'codeName', s);
    _.w(d, 'confirmMsg', s);
    _.w(d, 'counterId', s);
    _.w(d, 'dataAccessAction', s);
    _.w(d, 'dialogResult', s);
    _.x(d, 'frontAppViewId', s, 'getFrontPSAppView');
    _.w(d, 'frontProcessType', s);
    _.w(d, 'fullCodeName', s);
    _.w(d, 'htmlPageUrl', s);
    _.x(d, 'nextId', s, 'getNextPSUIAction');
    _.x(d, 'appDEMethodId', s, 'getPSAppDEMethod');
    _.x(d, 'deopprivId', s, 'getPSDEOPPriv');
    _.v(
      d,
      'navigateContexts',
      c.m('control.NavigateContext[]', s, 'getPSNavigateContexts'),
    );
    _.v(
      d,
      'navigateParams',
      c.m('control.NavigateParam[]', s, 'getPSNavigateParams'),
    );
    _.v(d, 'sysImage', c.s('res.SysImage[]', s, 'getPSSysImage'));
    _.x(d, 'sysPFPluginId', s, 'getPSSysPFPlugin');
    _.w(d, 'paramItem', s);
    _.w(d, 'predefinedType', s);
    _.w(d, 'refreshMode', s, '', 0);
    _.v(d, 'smlanguageRes', c.s('res.LanguageRes[]', s, 'getSMPSLanguageRes'));
    _.w(d, 'scriptCode', s);
    _.w(d, 'successMsg', s);
    _.w(d, 'textItem', s);
    _.w(d, 'timeout', s);
    _.w(d, 'tooltip', s);
    _.v(
      d,
      'tooltipLanguageRes',
      c.s('res.LanguageRes[]', s, 'getTooltipPSLanguageRes'),
    );
    _.w(d, 'uiactionMode', s, 'uIActionMode');
    _.w(d, 'uiactionParamJO', s, 'uIActionParamJO');
    _.w(d, 'uiactionTag', s, 'uIActionTag');
    _.w(d, 'uiactionType', s, 'uIActionType');
    _.w(d, 'uilogicAttachMode', s, 'uILogicAttachMode');
    _.w(d, 'uilogicType', s, 'uILogicType');
    _.w(d, 'valueItem', s);
    _.w(d, 'asyncAction', s);
    _.w(d, 'closeEditView', s);
    _.w(d, 'enableConfirm', s);
    _.w(d, 'group', s);
    _.w(d, 'reloadData', s);
    _.w(d, 'saveTargetFirst', s);
    _.w(d, 'showBusyIndicator', s, '', true);

    //let iPSAppDEUIAction = src

    _.w(d, 'noPrivDisplayMode', s, '', 2);
    _.w(d, 'contextJOString', s);
    _.x(d, 'appDEACModeId', s, 'getPSAppDEACMode');
    _.x(d, 'appDEDataExportId', s, 'getPSAppDEDataExport');
    _.x(d, 'appDEDataImportId', s, 'getPSAppDEDataImport');
    _.x(d, 'appDEPrintId', s, 'getPSAppDEPrint');
    _.x(d, 'appDEUILogicId', s, 'getPSAppDEUILogic');
    _.x(d, 'appDataEntityId', s, 'getPSAppDataEntity');
    _.x(d, 'appUILogicId', s, 'getPSAppUILogic');
    _.v(
      d,
      'deeditForm',
      c.s('control.form.DEEditForm[]', s, 'getPSDEEditForm'),
    );

    super.onFillDSL(c, s, d);
  }
}
