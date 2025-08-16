import { IButtonMenu, IDomEditor } from '@wangeditor/editor';

/**
 * AI菜单项
 *
 * @export
 * @class AIButtonMenu
 * @implements {IButtonMenu}
 */
class AIButtonMenu implements IButtonMenu {
  /**
   *
   *
   * @type {string}
   * @memberof AIButtonMenu
   */
  title: string = 'AI';

  /**
   *
   *
   * @type {string}
   * @memberof AIButtonMenu
   */
  iconSvg: string =
    '<svg xmlns="http://www.w3.org/2000/svg" version="1.1"> <text x="0" y="13" font-size="16" fill="black">AI</text></svg>';

  /**
   *
   *
   * @type {string}
   * @memberof AIButtonMenu
   */
  tag: string = 'button';

  /**
   * 菜单是否需要激活（如选中加粗文本，“加粗”菜单会激活），用不到则返回 false
   *
   * @return {*}  {boolean}
   * @memberof AIButtonMenu
   */
  isActive(): boolean {
    return false;
  }

  /**
   * 获取菜单执行时的 value ，用不到则返回空 字符串或 false
   *
   * @return {*}  {(string | boolean)}
   * @memberof AIButtonMenu
   */
  getValue(): string | boolean {
    return 'aichart';
  }

  /**
   * 菜单是否需要禁用（如选中 H1 ，“引用”菜单被禁用），用不到则返回 false
   *
   * @return {*}  {boolean}
   * @memberof AIButtonMenu
   */
  isDisabled(): boolean {
    return false;
  }

  /**
   * 点击菜单时触发的函数
   *
   * @param {IDomEditor} editor
   * @memberof AIButtonMenu
   */
  exec(editor: IDomEditor): void {
    editor.emit('aiClick');
  }
}

/**
 * Ai菜单
 */
export const AIMenu = {
  key: 'aichart',
  factory(): AIButtonMenu {
    return new AIButtonMenu();
  },
};
