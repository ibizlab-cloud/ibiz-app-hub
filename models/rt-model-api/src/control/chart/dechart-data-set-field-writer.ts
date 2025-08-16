import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DEChartObjectWriterBase } from './dechart-object-writer-base';

export class DEChartDataSetFieldWriter extends DEChartObjectWriterBase {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEChartDataSetField = src

    _.w(d, 'groupMode', s);
    _.x(d, 'codeListId', s, 'getPSCodeList');
    _.w(d, 'groupField', s);

    super.onFillDSL(c, s, d);
  }
}
