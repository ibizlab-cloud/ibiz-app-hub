import { IDEReportPanel } from '@ibiz/model-core';
import { IReportPanelController } from '../../../../interface';

/**
 * 报表生成器基类
 *
 * @export
 * @class ReportPanelBaseGenerator
 */
export class ReportPanelBaseGenerator {
  /**
   * 报表面板模型
   *
   * @protected
   * @type {IDEReportPanel}
   * @memberof ReportPanelBaseGenerator
   */
  protected model!: IDEReportPanel;

  /**
   * 报表控制器
   *
   * @author tony001
   * @date 2024-06-20 15:06:54
   * @protected
   * @type {IReportPanelController}
   */
  protected reportPanel!: IReportPanelController;

  /**
   * 原始控制器引用
   *
   * @protected
   * @type {(IData | undefined)}
   * @memberof ReportPanelBaseGenerator
   */
  public protoRef: IData | undefined;

  /**
   * 配置
   *
   * @type {IData}
   * @memberof ReportPanelBaseGenerator
   */
  public config: IData = {};

  /**
   * Creates an instance of ReportPanelBaseGenerator.
   * @param {IDEReportPanel} model
   * @memberof ReportPanelBaseGenerator
   */
  public constructor(
    model: IDEReportPanel,
    reportPanel: IReportPanelController,
  ) {
    this.model = model;
    this.reportPanel = reportPanel;
  }

  /**
   * 初始化配置
   *
   * @author tony001
   * @date 2024-06-26 16:06:01
   */
  public async initConfig(): Promise<void> {}

  /**
   * 初始化
   *
   * @param {IData} args
   * @memberof ReportPanelBaseGenerator
   */
  public init(args: IData): void {
    this.protoRef = args;
  }

  /**
   * 加载
   *
   * @param {IData} data
   * @return {*}  {Promise<IData>}
   * @memberof ReportPanelBaseGenerator
   */
  public load(data: IData = {}): Promise<IData> {
    return Promise.resolve(data);
  }
}
