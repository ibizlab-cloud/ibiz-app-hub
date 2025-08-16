import { RuntimeModelError } from '@ibiz-template/core';
import { IUILogicParams } from '../../interface';
import { UIActionUtil } from '../../ui-action';
import { LogicExecutor } from './logic-executor';

/**
 * 应用界面行为执行
 * @author lxm
 * @date 2023-07-17 01:57:27
 * @export
 * @class AppUILogicExecutor
 * @extends {LogicExecutor}
 */
export class AppDEUIActionExecutor extends LogicExecutor {
  declare type: 'APPDEUIACTION';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  execute(executeParams: IUILogicParams): any {
    if (!this.logic.appDEUIActionId) {
      throw new RuntimeModelError(
        this.logic,
        ibiz.i18n.t('runtime.logicScheduler.executor.missingTrigger'),
      );
    }
    UIActionUtil.execAndResolved(
      this.logic.appDEUIActionId,
      executeParams,
      this.logic.appId,
    );
  }
}
