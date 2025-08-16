import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DEChartCoordinateSystemControlWriterBase2 } from './dechart-coordinate-system-control-writer-base2';

export class DEChartGridWriter extends DEChartCoordinateSystemControlWriterBase2 {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEChartGrid = src

    _.x(d, 'chartGridXAxis0Id', s, 'getPSChartGridXAxis0');
    _.x(d, 'chartGridXAxis1Id', s, 'getPSChartGridXAxis1');
    _.x(d, 'chartGridYAxis0Id', s, 'getPSChartGridYAxis0');
    _.x(d, 'chartGridYAxis1Id', s, 'getPSChartGridYAxis1');

    super.onFillDSL(c, s, d);
  }
}
