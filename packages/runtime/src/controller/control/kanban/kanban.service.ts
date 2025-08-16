import { IHttpResponse } from '@ibiz-template/core';
import { IDEKanban } from '@ibiz/model-core';
import { clone } from 'ramda';
import { ControlVO } from '../../../service';
import { DataViewControlService } from '../data-view';

/**
 * 看板（kanban）部件服务
 *
 * @export
 * @class DataViewControlService
 * @extends {MDControlService<IDEDataView>}
 */
export class KanbanService extends DataViewControlService<IDEKanban> {
  /**
   * 更新分组数据
   *
   * @author lxm
   * @date 2022-09-07 19:09:11
   * @param {IContext} context 上下文
   * @param {ControlVO} data 数据
   * @returns {*}
   */
  async updateGroup(
    context: IContext,
    data: ControlVO,
  ): Promise<IHttpResponse<ControlVO>> {
    const updateAction =
      this.model.updateGroupControlAction?.appDEMethodId || 'update';
    let res = await this.exec(updateAction, context, data.getOrigin());
    res = this.handleResponse(res);
    return res as IHttpResponse<ControlVO>;
  }

  /**
   * 移动并排序数据
   *
   * @author tony001
   * @date 2024-06-16 12:06:02
   * @param {IContext} context
   * @param {ControlVO} data
   * @return {*}  {Promise<IHttpResponse<ControlVO[]>>}
   */
  async moveOrderItem(
    context: IContext,
    data: ControlVO,
    args: IData,
  ): Promise<IHttpResponse<ControlVO[]>> {
    const moveAction = this.model.moveControlAction!.appDEMethodId!;
    const params = clone(data.getOrigin());
    Object.assign(params, args);
    let res = await this.exec(moveAction, context, params, {
      srfupdateitem: true,
    });
    res = this.handleResponse(res);
    return res as IHttpResponse<ControlVO[]>;
  }
}
