/* eslint-disable no-unused-vars */
import { getCurrentInstance, onBeforeUnmount, reactive } from 'vue';
import { clone } from 'ramda';
import { IAppBIReport } from '@ibiz/model-core';
import { BIReportDesignController } from '../controller';
import { IBIReportChartController } from '../interface';

/**
 * 获取组件的props,只能在setup里使用
 *
 * @author tony001
 * @date 2024-06-05 14:06:30
 * @export
 * @return {*}  {IData}
 */
export function useProps(): IData {
  const vue = getCurrentInstance()!.proxy!;
  return vue.$props;
}

/**
 * 构建报表设计控制器
 *
 * @author tony001
 * @date 2024-05-21 17:05:39
 * @export
 * @param {(
 *     ...args: ConstructorParameters<typeof BIReportDesignController>
 *   ) => BIReportDesignController} fn
 * @return {*}  {BIReportDesignController}
 */
export function useBIReportDesignController(
  fn: (
    ...args: ConstructorParameters<typeof BIReportDesignController>
  ) => BIReportDesignController,
): BIReportDesignController {
  const props = useProps();
  const c = fn(
    props.context,
    props.viewParams,
    props.config,
    props.dismiss,
    props.measureToolbar,
    props.dimensionToolbar,
  );
  c.state = reactive(c.state);
  c.created();
  onBeforeUnmount(() => c.destroyed());
  return c;
}

/**
 * 构建报表图表控制器
 *
 * @author tony001
 * @date 2024-06-12 18:06:13
 * @export
 * @param {(...args: any) => IBIReportChartController} fn
 * @param {IData} opts
 * @return {*}  {IBIReportChartController}
 */
export function useBIReportChartController(
  fn: (
    mode: string,
    context: IContext,
    viewParams: IParams,
    config: IAppBIReport,
  ) => IBIReportChartController,
  opts: IData,
): IBIReportChartController {
  const c = fn(opts.mode, opts.context, opts.viewParams, clone(opts.config));
  c.state = reactive(c.state);
  c.created();
  onBeforeUnmount(() => c.destroyed());
  return c;
}
