import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../../model-object-writer';

export class AppViewMsgWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppViewMsg = src

    _.w(d, 'codeName', s);
    _.w(d, 'dataAccessAction', s);
    _.w(d, 'dynamicMode', s, '', 0);
    _.w(d, 'enableMode', s, '', 'ALL');
    _.w(d, 'message', s);
    _.w(d, 'messageType', s);
    _.x(d, 'appDataEntityId', s, 'getPSAppDataEntity');
    _.x(d, 'appMsgTemplId', s, 'getPSAppMsgTempl');
    _.v(
      d,
      'layoutPanel',
      c.s('control.panel.LayoutPanel[]', s, 'getPSLayoutPanel'),
    );
    _.v(d, 'sysCss', c.s('res.SysCss[]', s, 'getPSSysCss'));
    _.v(d, 'sysImage', c.s('res.SysImage[]', s, 'getPSSysImage'));
    _.w(d, 'position', s);
    _.w(d, 'removeMode', s);
    _.x(d, 'testAppDELogicId', s, 'getTestPSAppDELogic');
    _.x(d, 'testDEOPPrivId', s, 'getTestPSDEOPPriv');
    _.w(d, 'testScriptCode', s);
    _.w(d, 'title', s);
    _.w(d, 'titleLanResTag', s);
    _.v(
      d,
      'titleLanguageRes',
      c.s('res.LanguageRes[]', s, 'getTitlePSLanguageRes'),
    );
    _.w(d, 'enableRemove', s);

    super.onFillDSL(c, s, d);
  }
}
