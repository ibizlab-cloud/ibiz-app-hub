import { BINumberChartController } from '../controller';
import {
  IBIReportChartController,
  IChartMeta,
  IReportChartProvider,
} from '../interface';
import { useBIReportChartController } from '../use';

export class BIReportNumberProvider implements IReportChartProvider {
  component: string = 'IBizBIReportNumber';

  createController(chartMeta: IChartMeta): IBIReportChartController {
    const c = useBIReportChartController(
      (...args) => new BINumberChartController(...args),
      {
        ...chartMeta,
      },
    );
    return c;
  }
}
