import { BIScatterController } from '../controller';
import {
  IBIReportChartController,
  IChartMeta,
  IReportChartProvider,
} from '../interface';
import { useBIReportChartController } from '../use';

/**
 * 散点图适配器
 *
 * @export
 * @class BIReportScatterChartProvider
 * @implements {IReportChartProvider}
 */
export class BIReportScatterChartProvider implements IReportChartProvider {
  component: string = 'IBizBIReportChartShell';

  createController(chartMeta: IChartMeta): IBIReportChartController {
    const c = useBIReportChartController(
      (...args) => new BIScatterController(...args),
      {
        ...chartMeta,
      },
    );
    return c;
  }
}
