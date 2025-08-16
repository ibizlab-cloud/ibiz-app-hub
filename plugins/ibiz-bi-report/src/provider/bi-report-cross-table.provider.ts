import { BICrossTableController } from '../controller';
import {
  IChartMeta,
  IBIReportChartController,
  IReportChartProvider,
} from '../interface';
import { useBIReportChartController } from '../use';

export class BIReportCrossTableProvider implements IReportChartProvider {
  component: string = 'IBizBIReportGridShell';

  createController(chartMeta: IChartMeta): IBIReportChartController {
    const c = useBIReportChartController(
      (...args) => new BICrossTableController(...args),
      {
        ...chartMeta,
      },
    );
    return c;
  }
}
