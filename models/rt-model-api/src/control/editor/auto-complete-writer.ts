import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { AjaxEditorWriter } from '../ajax-editor-writer';

export class AutoCompleteWriter extends AjaxEditorWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAutoComplete = src

    _.w(d, 'acminChars', s, 'aCMinChars', 0);
    _.w(d, 'contextJOString', s);
    _.w(d, 'itemParamJO', s);
    _.x(d, 'appDEACModeId', s, 'getPSAppDEACMode');
    _.x(d, 'appDEDataSetId', s, 'getPSAppDEDataSet');
    _.x(d, 'appDataEntityId', s, 'getPSAppDataEntity');
    _.v(
      d,
      'uiactionGroup',
      c.s('view.UIActionGroup[]', s, 'getPSUIActionGroup'),
    );
    _.w(d, 'paramJOString', s);
    _.w(d, 'enableAC', s);
    _.w(d, 'forceSelection', s);
    _.w(d, 'showTrigger', s);

    //let iPSTextEditor = src

    _.w(d, 'maxLength', s);
    _.w(d, 'minLength', s, '', 0);
    _.x(d, 'appCodeListId', s, 'getPSAppCodeList');
    _.v(
      d,
      'sysValueRule',
      c.s('valuerule.SysValueRule[]', s, 'getPSSysValueRule'),
    );
    _.w(d, 'showMaxLength', s);

    super.onFillDSL(c, s, d);
  }
}
