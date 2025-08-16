import { IEditor } from './ieditor';
import { IModelObject } from '../imodel-object';

/**
 *
 * 编辑器容器模型对象接口
 * @export
 * @interface IEditorContainer
 */
export interface IEditorContainer extends IModelObject {
  /**
   * 编辑器对象
   *
   * @type {IEditor}
   * 来源  getPSEditor
   */
  editor?: IEditor;
}
