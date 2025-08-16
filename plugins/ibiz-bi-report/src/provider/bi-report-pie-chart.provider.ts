import { BIPieChartController } from '../controller';
import {
  IChartMeta,
  IBIReportChartController,
  IReportChartProvider,
} from '../interface';
import { useBIReportChartController } from '../use';

export class BIReportPieChartProvider implements IReportChartProvider {
  component: string = 'IBizBIReportChartShell';

  createController(chartMeta: IChartMeta): IBIReportChartController {
    const c = useBIReportChartController(
      (...args) => new BIPieChartController(...args),
      {
        ...chartMeta,
      },
    );
    return c;
  }
}
