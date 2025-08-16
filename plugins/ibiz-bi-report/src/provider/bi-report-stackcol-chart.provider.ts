import { BIStackColChartController } from '../controller';
import {
  IBIReportChartController,
  IChartMeta,
  IReportChartProvider,
} from '../interface';
import { useBIReportChartController } from '../use';

export class BIReportStackColChartProvider implements IReportChartProvider {
  component: string = 'IBizBIReportChartShell';

  createController(chartMeta: IChartMeta): IBIReportChartController {
    const c = useBIReportChartController(
      (...args) => new BIStackColChartController(...args),
      {
        ...chartMeta,
      },
    );
    return c;
  }
}
