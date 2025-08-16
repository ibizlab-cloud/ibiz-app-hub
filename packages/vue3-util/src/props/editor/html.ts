import { getEditorProps, getGridEditorCommonProps } from './common';

/**
 * @description 获取html编辑框props
 * @export
 * @template C
 * @returns {*}
 * @editorprops
 */
export function getHtmlProps<C>() {
  return {
    ...getEditorProps<C>(),
    /**
     * @description 编辑器值
     */
    value: String,
  };
}

/**
 * @description 获取表格html编辑框props
 * @export
 * @template C
 * @returns {*}
 */
export function getGridHtmlProps<C>() {
  return { ...getHtmlProps<C>(), ...getGridEditorCommonProps() };
}
