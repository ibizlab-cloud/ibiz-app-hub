import { BIMultiSeriesColChartController } from '../controller';
import {
  IChartMeta,
  IBIReportChartController,
  IReportChartProvider,
} from '../interface';
import { useBIReportChartController } from '../use';

export class BiReportMultiSeriesColChartProvider
  implements IReportChartProvider
{
  component: string = 'IBizBIReportChartShell';

  createController(chartMeta: IChartMeta): IBIReportChartController {
    const c = useBIReportChartController(
      (...args) => new BIMultiSeriesColChartController(...args),
      {
        ...chartMeta,
      },
    );
    return c;
  }
}
