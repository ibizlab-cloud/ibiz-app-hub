/**
 * 检查是否在窗口内部
 *
 * @export
 * @param {{ x: number; y: number }} data
 * @return {*}  {boolean}
 */
export function isWithinBounds(data: { x: number; y: number }): boolean {
  return data.x >= 0 && data.x <= 1 && data.y >= 0 && data.y <= 1;
}

/**
 * 拖拽限制（不能超出窗口）
 *
 * @export
 * @param {number} left
 * @param {number} top
 * @param {number} width
 * @param {number} height
 * @return {*}  {{
 *   x: number;
 *   y: number;
 * }}
 */
export function limitDraggable(
  left: number,
  top: number,
  width: number,
  height: number,
): {
  x: number;
  y: number;
} {
  const offsetX = left / window.innerWidth;
  const offsetY = top / window.innerHeight;
  const x = Math.max(0, Math.min(offsetX, 1 - width));
  const y = Math.max(0, Math.min(offsetY, 1 - height));
  return { x, y };
}
