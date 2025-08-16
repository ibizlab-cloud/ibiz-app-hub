import { IDEKanban } from '@ibiz/model-core';
import { IKanbanEvent } from '../../event';
import { IKanbanState } from '../../state';
import { IDataViewControlController } from './i-data-view-control.controller';
import { IApiKanbanController } from '../../../api';
import { IViewController } from '../view';

/**
 * @description  看板部件控制器接口
 * @export
 * @interface IKanbanController
 * @extends {IDataViewControlController<IDEKanban, IKanbanState, IKanbanEvent>}
 * @extends {IApiKanbanController<IDEKanban, IKanbanState>}
 */
export interface IKanbanController
  extends IDataViewControlController<IDEKanban, IKanbanState, IKanbanEvent>,
    IApiKanbanController<IDEKanban, IKanbanState> {
  /**
   * @description 视图控制器
   * @type {IViewController}
   * @memberof IKanbanController
   */
  view: IViewController;

  /**
   * @description 是否全屏
   * @returns {*}  {boolean}
   * @memberof IKanbanController
   */
  getFullscreen(): boolean;

  /**
   * @description 打开对应分组批操作工具栏
   * @param {(string | number)} groupKey
   * @memberof IKanbanController
   */
  openBatch(groupKey: string | number): void;

  /**
   * @description 关闭批操作工具栏
   * @memberof IKanbanController
   */
  closeBatch(): void;
}
