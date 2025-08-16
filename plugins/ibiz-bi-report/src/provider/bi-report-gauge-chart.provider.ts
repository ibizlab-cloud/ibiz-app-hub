import { BIGaugeChartController } from '../controller';
import {
  IChartMeta,
  IBIReportChartController,
  IReportChartProvider,
} from '../interface';
import { useBIReportChartController } from '../use';

/**
 * 仪表盘适配器
 *
 * @export
 * @class BiReportGaugeChartProvider
 * @implements {IReportChartProvider}
 */
export class BiReportGaugeChartProvider implements IReportChartProvider {
  component: string = 'IBizBIReportChartShell';

  createController(chartMeta: IChartMeta): IBIReportChartController {
    const c = useBIReportChartController(
      (...args) => new BIGaugeChartController(...args),
      {
        ...chartMeta,
      },
    );
    return c;
  }
}
