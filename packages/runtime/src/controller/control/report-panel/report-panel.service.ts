import { IDEReportPanel, IAppDataEntity } from '@ibiz/model-core';
import { IHttpResponse } from '@ibiz-template/core';
import { ControlService, ControlVO } from '../../../service';

export class ReportPanelService<
  T extends IDEReportPanel = IDEReportPanel,
> extends ControlService<T> {
  /**
   * 当前部件对应的应用实体对象
   *
   * @protected
   * @type {IAppDataEntity}
   */
  protected dataEntity!: IAppDataEntity;

  /**
   * 执行查询报表数据的方法
   *
   * @param {IContext} context 上下文
   * @param {IParams} [params={}] 视图参数
   * @returns {*}  {Promise<IHttpResponse>}
   */
  async fetch(
    context: IContext,
    params: IParams = {},
  ): Promise<IHttpResponse<ControlVO>> {
    this.dataEntity = await ibiz.hub.getAppDataEntity(
      this.model.appDataEntityId!,
      this.model.appId,
    );
    const url = `${this.dataEntity.deapicodeName2}/report?srfreporttag=${this.model.codeName}`;
    let res = await ibiz.net.request(url, {
      method: 'post',
      data: params,
    });
    res = this.handleResponse(res);
    return res as IHttpResponse<ControlVO>;
  }
}
