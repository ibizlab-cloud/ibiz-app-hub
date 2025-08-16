import { getEditorProps, getGridEditorCommonProps } from './common';

/**
 * @description 获取MARKDOWN编辑器props
 * @export
 * @template C
 * @returns {*}
 * @editorprops
 */
export function getMarkDownProps<C>() {
  return {
    ...getEditorProps<C>(),
    /**
     * @description 容器数据，通常为表单数据，表格行数据，面板数据
     */
    data: { type: Object, required: false },
    /**
     * @description 编辑器控制器对象
     */
    controller: { type: Object, required: false },
    /**
     * @description 是否禁用
     */
    disabled: { type: Boolean, required: false },
  };
}

/**
 * @description 获取表格MARKDOWN编辑器props
 * @export
 * @template C
 * @returns {*}
 */
export function getGridMarkDownProps<C>() {
  return { ...getMarkDownProps<C>(), ...getGridEditorCommonProps() };
}
