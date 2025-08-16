import { BIMultiSeriesLineChartController } from '../controller';
import {
  IBIReportChartController,
  IChartMeta,
  IReportChartProvider,
} from '../interface';
import { useBIReportChartController } from '../use';

export class BIReportMultiSeriesLineChartProvider
  implements IReportChartProvider
{
  component: string = 'IBizBIReportChartShell';

  createController(chartMeta: IChartMeta): IBIReportChartController {
    const c = useBIReportChartController(
      (...args) => new BIMultiSeriesLineChartController(...args),
      {
        ...chartMeta,
      },
    );
    return c;
  }
}
