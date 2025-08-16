import { getEditorProps, getGridEditorCommonProps } from './common';

/**
 * @description 获取代码编辑器props
 * @export
 * @template C
 * @returns {*}
 * @editorprops
 */
export function getCodeProps<C>() {
  return {
    ...getEditorProps<C>(),
    /**
     * @description 编辑器值
     */
    value: String,
    /**
     * @description 代码语言类型
     */
    language: {
      type: String,
    },
    /**
     * @description 主题类型
     */
    theme: {
      type: String,
    },
  };
}

/**
 * @description 获取表格代码编辑器props
 * @export
 * @template C
 * @returns {*}
 */
export function getGridCodeProps<C>() {
  return { ...getCodeProps<C>(), ...getGridEditorCommonProps() };
}
