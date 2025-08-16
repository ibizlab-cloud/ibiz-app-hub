import { BIRadarController } from '../controller';
import {
  IBIReportChartController,
  IChartMeta,
  IReportChartProvider,
} from '../interface';
import { useBIReportChartController } from '../use';

/**
 * 雷达图适配器
 *
 * @export
 * @class BIReportRadarChartProvider
 * @implements {IReportChartProvider}
 */
export class BIReportRadarChartProvider implements IReportChartProvider {
  component: string = 'IBizBIReportChartShell';

  createController(chartMeta: IChartMeta): IBIReportChartController {
    const c = useBIReportChartController(
      (...args) => new BIRadarController(...args),
      {
        ...chartMeta,
      },
    );
    return c;
  }
}
