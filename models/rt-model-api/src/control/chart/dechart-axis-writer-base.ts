import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DEChartObjectWriterBase } from './dechart-object-writer-base';

export class DEChartAxisWriterBase extends DEChartObjectWriterBase {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSChartAxis = src

    _.w(d, 'baseOptionJOString', s);
    _.v(
      d,
      'capLanguageRes',
      c.s('res.LanguageRes[]', s, 'getCapPSLanguageRes'),
    );
    _.w(d, 'caption', s);
    _.w(d, 'dataShowMode', s, '', 0);
    _.w(d, 'echartsPos', s, 'eChartsPos');
    _.w(d, 'echartsType', s, 'eChartsType');
    _.w(d, 'maxValue', s);
    _.w(d, 'minValue', s);
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
    _.x(d, 'sysPFPluginId', s, 'getPSSysPFPlugin');
    _.w(d, 'position', s);
    _.w(d, 'type', s);

    super.onFillDSL(c, s, d);
  }
}
