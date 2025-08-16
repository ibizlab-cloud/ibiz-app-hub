import { IDEUIPFPluginLogic } from '@ibiz/model-core';
import { UILogicContext } from '../../ui-logic-context';
import { UILogicNode } from '../ui-logic-node';
import { getUILogicNodeProvider } from '../../../register';

/**
 * 前端插件节点
 *
 * @author chitanda
 * @date 2023-11-01 18:11:55
 * @export
 * @class PFPluginNode
 * @extends {UILogicNode}
 */
export class PFPluginNode extends UILogicNode {
  declare model: IDEUIPFPluginLogic;

  async exec(ctx: UILogicContext): Promise<void> {
    ibiz.log.debug(
      ibiz.i18n.t('runtime.uiLogic.interfaceLogicNodeFrontendPlugin', {
        id: this.model.id,
        sysPFPluginId: this.model.sysPFPluginId,
      }),
    );
    const provider = await getUILogicNodeProvider(this.model);
    if (provider) {
      await provider.exec(this.model, ctx);
    }
  }
}
