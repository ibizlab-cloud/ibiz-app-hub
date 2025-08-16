import { BITableController } from '../controller';
import {
  IChartMeta,
  IBIReportChartController,
  IReportChartProvider,
} from '../interface';
import { useBIReportChartController } from '../use';

export class BIReportTableProvider implements IReportChartProvider {
  component: string = 'IBizBIReportGridShell';

  createController(chartMeta: IChartMeta): IBIReportChartController {
    const c = useBIReportChartController(
      (...args) => new BITableController(...args),
      {
        ...chartMeta,
      },
    );
    return c;
  }
}
