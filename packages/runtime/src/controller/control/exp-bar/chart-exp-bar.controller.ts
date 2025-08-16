import { IChartExpBar, IDEChart, INavigatable } from '@ibiz/model-core';
import {
  IChartExpBarState,
  IChartExpBarEvent,
  IChartExpBarController,
  INavViewMsg,
} from '../../../interface';
import { ExpBarControlController } from './exp-bar.controller';
import { ChartController } from '../chart';
import { convertNavData } from '../../../utils';

/**
 * 图表导航栏控制器
 *
 * @export
 * @class ChartExpBarController
 * @extends {ExpBarControlController<IChartExpBar, IChartExpBarState, IChartExpBarEvent>}
 * @implements {IChartExpBarController}
 */
export class ChartExpBarController
  extends ExpBarControlController<
    IChartExpBar,
    IChartExpBarState,
    IChartExpBarEvent
  >
  implements IChartExpBarController
{
  /**
   * 导航页面首次打开且没有回显时，
   * 默认取第一条数据进行导航
   * 对于不同的导航，第一条可导航的数据可能定义不同，可以重写改方法。
   * @author lxm
   * @date 2023-08-10 03:58:15
   * @protected
   */
  protected navByFirstItem(): void {
    const data = this.xDataController.state.items[0];
    if (!data) {
      // 导航视图传空让他导航占位绘制空界面
      this.state.srfnav = '';
      this._evt.emit('onNavViewChange', {
        navViewMsg: {
          key: '',
          isCache: this.isCache,
        },
      });
      return;
    }
    // 默认选中并激活第一项(这里的第一项是我们自己封装的chartData)
    const activeSeriesGenerator = (
      this.xDataController as ChartController
    ).generator.seriesGenerators.find(generator => {
      return generator.chartDataArr.length > 0 && generator.model.navAppViewId;
    });
    if (activeSeriesGenerator) {
      const iterator = activeSeriesGenerator.groupData!.$default_group.values();
      const { chartData } = iterator.next().value;
      this.xDataController.setActive(chartData);
    }
  }

  /**
   * 解析参数
   *
   * @author zk
   * @date 2023-05-29 04:05:52
   * @param {IDETabViewPanel} tabViewPanel
   * @return {*}
   * @memberof ExpBarControlController
   */
  prepareParams(
    XDataModel: INavigatable & { appDataEntityId?: string },
    data: IData,
    context: IContext,
    params: IParams,
  ): { context: IContext; params: IParams } {
    const { context: tempContext, params: tempParams } = super.prepareParams(
      XDataModel,
      data,
      context,
      params,
    );
    // 序列上或配置导航相关参数
    if (data._seriesModelId) {
      const seriesModel = (XDataModel as IDEChart).dechartSerieses?.find(
        series => {
          return series.id === data._seriesModelId;
        },
      );
      if (seriesModel) {
        const { navigateContexts, navigateParams } = seriesModel;
        // 序列上配的导航视图参数和上下文
        const tempContext2 = convertNavData(
          navigateContexts,
          data,
          params,
          tempContext,
        );
        const tempParams2 = convertNavData(
          navigateParams,
          data,
          params,
          tempParams,
        );
        return {
          context: Object.assign(tempContext.clone(), tempContext2),
          params: tempParams2,
        };
      }
    }
    return { context: tempContext, params: tempParams };
  }

  /**
   * 获取导航视图
   *
   * @author zk
   * @date 2023-06-29 03:06:41
   * @param {IDETabViewPanel} tabViewPanel
   * @return {*}  {Promise<INavViewMsg>}
   * @memberof TabExpPanelController
   */
  public getNavViewMsg(
    data: IData,
    context: IContext,
    params: IParams,
  ): INavViewMsg {
    let viewModelId;
    if (data._seriesModelId) {
      const seriesModel = (this.XDataModel as IDEChart).dechartSerieses?.find(
        series => {
          return series.id === data._seriesModelId;
        },
      );
      viewModelId = seriesModel?.navAppViewId;
    }
    const result = this.prepareParams(this.XDataModel!, data, context, params);
    return {
      key: data._uuid,
      context: result.context,
      params: result.params,
      viewId: viewModelId,
      isCache: this.isCache,
    };
  }
}
