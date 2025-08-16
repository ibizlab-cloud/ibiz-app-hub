import { IDEReportPanel, IAppDataEntity } from '@ibiz/model-core';
import {
  MDCtrlLoadParams,
  IReportPanelController,
  IReportPanelEvent,
  IReportPanelState,
} from '../../../interface';
import { ControlController } from '../../common';
import { ReportPanelService } from './report-panel.service';
import { ControllerEvent } from '../../utils';
import { ReportPanelBaseGenerator } from './generator/base-generator';
import { ReportPanelGeneratorFactory } from './generator/generator-factory';

export class ReportPanelController
  extends ControlController<
    IDEReportPanel,
    IReportPanelState,
    IReportPanelEvent
  >
  implements IReportPanelController
{
  /**
   * 报表部件服务
   *
   * @type {ReportPanelService}
   */
  protected service!: ReportPanelService;

  /**
   * 当前部件对应的应用实体对象
   *
   * @protected
   * @type {IAppDataEntity}
   */
  protected dataEntity!: IAppDataEntity;

  /**
   * 报表生成器
   *
   * @protected
   * @type {ReportPanelBaseGenerator}
   * @memberof ReportPanelController
   */
  public generator!: ReportPanelBaseGenerator;

  /**
   * 事件对象
   *
   * @readonly
   * @protected
   * @type {ControllerEvent<IReportPanelEvent>}
   * @memberof ReportPanelController
   */
  protected get _evt(): ControllerEvent<IReportPanelEvent> {
    return this.evt;
  }

  /**
   * 是否为bi报表
   *
   * @author tony001
   * @date 2024-06-19 18:06:02
   * @readonly
   */
  get isBIReport(): boolean {
    if (
      this.state.reportType === 'DESYSBIREPORTS' ||
      this.state.reportType === 'SYSBICUBE' ||
      this.state.reportType === 'DESYSBICUBES' ||
      this.state.reportType === 'ALLSYSBICUBES' ||
      this.state.reportType === 'SYSBIREPORT' ||
      this.state.reportType === 'SYSBICUBEREPORTS' ||
      this.state.reportType === 'ALLSYSBIREPORTS'
    ) {
      return true;
    }
    return false;
  }

  /**
   * 初始化状态
   *
   * @protected
   * @memberof ReportPanelController
   */
  protected initState(): void {
    super.initState();
    this.state.data = {};
    this.state.searchParams = {};
    this.state.reportType =
      (this.model.appDEReport && this.model.appDEReport.reportType) || '';
  }

  /**
   * 初始化方法
   *
   * @protected
   * @returns {*}  {Promise<void>}
   */
  protected async onCreated(): Promise<void> {
    await super.onCreated();
    this.generator = ReportPanelGeneratorFactory.getInstance(this.model, this);
    if (this.generator) {
      await this.generator.initConfig();
    }
    this.dataEntity = await ibiz.hub.getAppDataEntity(
      this.model.appDataEntityId!,
      this.model.appId,
    );
    this.service = new ReportPanelService(this.model);
    await this.service.init(this.context);
  }

  /**
   * 挂载
   *
   * @protected
   * @return {*}  {Promise<void>}
   * @memberof ReportPanelController
   */
  protected async onMounted(): Promise<void> {
    await super.onMounted();
    // 如果外面没有配置默认不加载的话，默认部件自己加载
    if (this.state.loadDefault) {
      this.load({ isInitialLoad: true });
    }
  }

  /**
   * 销毁
   *
   * @protected
   * @return {*}  {Promise<void>}
   * @memberof ReportPanelController
   */
  protected onDestroyed(): Promise<void> {
    return super.onDestroyed();
  }

  /**
   * 加载数据
   *
   * @public
   * @param {(MDCtrlLoadParams)} [args]
   * @return {*}  {Promise<IData>}
   * @memberof ReportPanelController
   */
  public async load(args: MDCtrlLoadParams = {}): Promise<IData> {
    if (this.state.reportType && this.isBIReport) {
      return {};
    }
    await this.startLoading();
    try {
      // *查询参数处理
      const { context } = this.handlerAbilityParams(args);
      const params = await this.getFetchParams(args?.viewParam);

      const res = await this.service.fetch(context, params);

      this.state.data = res.data;

      await this.afterLoad(args, res.data);

      this.state.isLoaded = true;
      await this._evt.emit('onLoadSuccess', undefined);
    } catch (error) {
      await this._evt.emit('onLoadError', undefined);
      this.actionNotification('FETCHERROR', {
        error: error as Error,
      });
      throw error;
    } finally {
      await this.endLoading();
    }
    this.actionNotification('FETCHSUCCESS');
    return this.state.data;
  }

  /**
   * 部件加载后处理
   *
   * @author chitanda
   * @date 2023-06-21 15:06:44
   * @param {MDCtrlLoadParams} args 本次请求参数
   * @param {IData[]} items 上游处理的数据（默认是后台数据）
   * @return {*}  {Promise<IData[]>} 返回给后续处理的数据
   */
  async afterLoad(args: MDCtrlLoadParams, data: IData): Promise<IData> {
    return data;
  }

  /**
   * 获取请求过滤参数（整合了视图参数，各种过滤条件，排序，分页）
   * @param {IParams} [extraParams] 额外视图参数，附加在最后
   * @return {*}  {Promise<IParams>}
   */
  async getFetchParams(extraParams?: IParams): Promise<IParams> {
    const resultParams: IParams = {
      ...this.params,
    };
    // *请求参数处理
    await this._evt.emit('onBeforeLoad', undefined);
    // 合并搜索条件参数，这些参数在onBeforeLoad监听里由外部填入
    Object.assign(resultParams, {
      ...this.state.searchParams,
    });

    // 额外附加参数
    if (extraParams) {
      Object.assign(resultParams, extraParams);
    }
    return resultParams;
  }

  /**
   * 报表数据
   *
   * @return {*}  {IData[]}
   * @memberof ReportPanelController
   */
  getData(): IData[] {
    if (this.isBIReport) {
      return this.generator.protoRef?.state.items || [];
    }
    return [this.state.data];
  }

  /**
   * 部件刷新，走初始加载
   * @date 2023-05-23 03:42:41
   */
  async refresh(): Promise<void> {
    if (this.isBIReport) {
      this.generator.load();
    } else {
      this.doNextActive(() => this.load({ isInitialLoad: false }), {
        key: 'refresh',
      });
    }
  }
}
