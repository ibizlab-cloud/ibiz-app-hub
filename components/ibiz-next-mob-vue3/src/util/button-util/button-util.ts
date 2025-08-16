/**
 * 转换按钮类型
 *
 * @export
 * @param {string} [buttonStyle]
 * @return {*}  {string}
 */
export function convertBtnType(buttonStyle?: string): string {
  let buttonType = 'default';
  if (
    buttonStyle &&
    ['PRIMARY', 'SUCCESS', 'WARNING', 'DANGER'].includes(buttonStyle)
  )
    buttonType = buttonStyle.toLowerCase();
  return buttonType;
}
