import { IReportChartProvider } from '../interface';
import { RegisterCenter } from './register-center';

/** 报表图表适配器前缀 */
export const REPORT_CHART_PROVIDER_PREFIX = 'REPORT_CHART';

/** 注册中心 */
const registerCenter = new RegisterCenter();

/** 注册报表图表适配器 */
export function registerReportChartProvider(
  key: string,
  callback: () => IReportChartProvider,
): void {
  registerCenter.register(`${REPORT_CHART_PROVIDER_PREFIX}_${key}`, callback);
}

/** 获取报表图表适配器 */
export function getReportChartProvider(
  key: string,
): IReportChartProvider | undefined {
  return registerCenter.get(
    `${REPORT_CHART_PROVIDER_PREFIX}_${key}`,
  ) as IReportChartProvider;
}
