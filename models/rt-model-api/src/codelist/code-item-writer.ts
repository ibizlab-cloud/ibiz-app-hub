import { IModelDSLGenEngineContext } from '../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../model-object-writer';

export class CodeItemWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSCodeItem = src

    _.w(d, 'bkcolor', s, 'bKColor');
    _.w(d, 'beginValue', s);
    _.w(d, 'codeName', s);
    _.w(d, 'color', s);
    _.w(d, 'data', s);
    _.w(d, 'endValue', s);
    _.w(d, 'iconCls', s);
    _.w(d, 'iconClsX', s);
    _.w(d, 'iconPath', s);
    _.w(d, 'iconPathX', s);
    _.v(d, 'codeItems', c.m('codelist.CodeItem[]', s, 'getPSCodeItems'));
    _.v(d, 'sysCss', c.s('res.SysCss[]', s, 'getPSSysCss'));
    _.v(d, 'sysImage', c.s('res.SysImage[]', s, 'getPSSysImage'));
    _.w(d, 'text', s);
    _.w(d, 'textCls', s);
    _.v(
      d,
      'textLanguageRes',
      c.s('res.LanguageRes[]', s, 'getTextPSLanguageRes'),
    );
    _.w(d, 'tooltip', s);
    _.v(
      d,
      'tooltipLanguageRes',
      c.s('res.LanguageRes[]', s, 'getTooltipPSLanguageRes'),
    );
    _.w(d, 'userData', s);
    _.w(d, 'userData2', s);
    _.w(d, 'value', s);
    _.w(d, 'default', s);
    _.w(d, 'disableSelect', s);
    _.w(d, 'includeBeginValue', s);
    _.w(d, 'includeEndValue', s);
    _.w(d, 'showAsEmtpy', s);

    super.onFillDSL(c, s, d);
  }
}
