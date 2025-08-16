import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ChartAxesWriter } from './chart-axes-writer';

export class DEChartAxesWriter extends ChartAxesWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEChartAxes = src

    _.w(d, 'axesPos', s);
    _.w(d, 'axesType', s);
    _.v(
      d,
      'capLanguageRes',
      c.s('res.LanguageRes[]', s, 'getCapPSLanguageRes'),
    );
    _.w(d, 'caption', s);
    _.w(d, 'coordinateSystemIndex', s);
    _.w(d, 'dataShowMode', s, '', 0);
    _.w(d, 'maxValue', s);
    _.w(d, 'minValue', s);
    _.x(d, 'sysPFPluginId', s, 'getPSSysPFPlugin');

    super.onFillDSL(c, s, d);
  }
}
