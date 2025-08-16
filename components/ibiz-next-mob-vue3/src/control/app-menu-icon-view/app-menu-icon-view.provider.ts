import { IControlProvider } from '@ibiz-template/runtime';

/**
 * 应用菜单适配器
 *
 * @author lxm
 * @date 2022-10-25 18:10:57
 * @export
 * @class AppMenuProvider
 * @implements {IControlProvider}
 */
export class AppMenuIconViewProvider implements IControlProvider {
  component: string = 'IBizAppMenuIconViewControl';
}
