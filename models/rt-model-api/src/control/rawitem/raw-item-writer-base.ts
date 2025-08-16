import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../../model-object-writer';

export class RawItemWriterBase extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSRawItemBase = src

    _.w(d, 'contentType', s);
    _.w(d, 'cssStyle', s);
    _.w(d, 'dynaClass', s);
    _.v(
      d,
      'controlAttributes',
      c.m('control.ControlAttribute[]', s, 'getPSControlAttributes'),
    );
    _.v(
      d,
      'controlLogics',
      c.m('control.ControlLogic[]', s, 'getPSControlLogics'),
    );
    _.v(
      d,
      'controlRenders',
      c.m('control.ControlRender[]', s, 'getPSControlRenders'),
    );
    _.v(
      d,
      'rawItemParams',
      c.m('control.RawItemParam[]', s, 'getPSRawItemParams'),
    );
    _.v(d, 'sysCss', c.s('res.SysCss[]', s, 'getPSSysCss'));
    _.w(d, 'predefinedType', s);
    _.w(d, 'rawItemHeight', s, '', 0.0);
    _.w(d, 'rawItemWidth', s, '', 0.0);
    _.w(d, 'tooltip', s);
    _.v(
      d,
      'tooltipLanguageRes',
      c.s('res.LanguageRes[]', s, 'getTooltipPSLanguageRes'),
    );
    _.w(d, 'templateMode', s);

    super.onFillDSL(c, s, d);
  }
}
