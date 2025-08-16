import { IControlProvider } from '@ibiz-template/runtime';

/**
 * 向导面板适配器
 *
 * @author zk
 * @date 2023-11-27 02:11:33
 * @export
 * @class WizardPanelProvider
 * @implements {IControlProvider}
 */
export class WizardPanelProvider implements IControlProvider {
  component: string = 'IBizWizardPanelControl';
}
