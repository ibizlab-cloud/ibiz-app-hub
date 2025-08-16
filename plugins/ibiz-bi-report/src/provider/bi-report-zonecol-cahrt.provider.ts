import { BIZoneColChartController } from '../controller';
import {
  IBIReportChartController,
  IChartMeta,
  IReportChartProvider,
} from '../interface';
import { useBIReportChartController } from '../use';

export class BIReportZoneColChartProvider implements IReportChartProvider {
  component: string = 'IBizBIReportChartShell';

  createController(chartMeta: IChartMeta): IBIReportChartController {
    const c = useBIReportChartController(
      (...args) => new BIZoneColChartController(...args),
      {
        ...chartMeta,
      },
    );
    return c;
  }
}
