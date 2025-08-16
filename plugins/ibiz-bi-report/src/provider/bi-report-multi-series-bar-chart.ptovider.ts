import { BIMultiSeriesBarChartController } from '../controller';
import {
  IBIReportChartController,
  IChartMeta,
  IReportChartProvider,
} from '../interface';
import { useBIReportChartController } from '../use';

export class BIReportMultiSeriesBarChartProvider
  implements IReportChartProvider
{
  component: string = 'IBizBIReportChartShell';

  createController(chartMeta: IChartMeta): IBIReportChartController {
    const c = useBIReportChartController(
      (...args) => new BIMultiSeriesBarChartController(...args),
      {
        ...chartMeta,
      },
    );
    return c;
  }
}
