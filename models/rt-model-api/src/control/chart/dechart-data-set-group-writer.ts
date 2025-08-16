import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DEChartObjectWriterBase } from './dechart-object-writer-base';

export class DEChartDataSetGroupWriter extends DEChartObjectWriterBase {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEChartDataSetGroup = src

    _.x(d, 'appDEDataSetId', s, 'getPSAppDEDataSet');
    _.x(d, 'appDataEntityId', s, 'getPSAppDataEntity');

    super.onFillDSL(c, s, d);
  }
}
