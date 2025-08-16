import { ModelListWriterBase } from '../../model-list-writer-base';
import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';

export class ChartSeriesEncodeListWriter extends ModelListWriterBase {
  onFillDSLList(c: IModelDSLGenEngineContext, src: any[], dst: any[]): void {
    const _ = this;
    src.forEach(item => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
    //super.onFillDSLList(context, src, dst)
  }

  onFillDSL(c: IModelDSLGenEngineContext, src: any, dst: any): void {
    switch (src['type']) {
      case 'NONE':
        c.fillDSL('control.chart.DEChartSeriesCSNoneEncode', src, dst);
        return;
      case 'XY':
        c.fillDSL('control.chart.DEChartSeriesCSCartesian2DEncode', src, dst);
        return;
    }

    //super.onFillDSL(context, src, dst)
  }
}
