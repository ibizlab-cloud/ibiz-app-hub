import { EditorController, ScriptFactory } from '@ibiz-template/runtime';
import { IHtml } from '@ibiz/model-core';

/**
 * html框编辑器控制器
 *
 * @export
 * @class HtmlEditorController
 * @extends {EditorController}
 */
export class HtmlEditorController extends EditorController<IHtml> {
  /**
   * 上传参数
   */
  public uploadParams?: IParams;

  /**
   * 下载参数
   */
  public exportParams?: IParams;

  /**
   * @description 是否显示工具栏
   * @type {boolean}
   * @memberof HtmlEditorController
   */
  public showToolbar: boolean = true;

  /**
   * 收缩时的高度
   *
   * @type {number}
   * @memberof HtmlEditorController
   */
  public defaultHeight: number = 200;

  /**
   * 是否显示伸缩按钮
   *
   * @type {boolean}
   * @memberof HtmlEditorController
   */
  public showCollapse: boolean = true;

  /**
   * @description 值模式(暂时只支持html模式，text模式存在问题)
   * @type {('text' | 'html')}
   * @memberof HtmlEditorController
   */
  public valueMode: 'text' | 'html' = 'html';

  /**
   * @description 图片模式
   * @type {('base64' | 'file')}
   * @memberof HtmlEditorController
   */
  public imageMode: 'base64' | 'file' = 'file';

  /**
   * @description quill配置
   * @type {IData}
   * @memberof HtmlEditorController
   */
  public modules: IData = {
    toolbar: [
      [{ header: [1, 2, 3, 4, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      ['link', 'image', 'code-block'],
    ],
  };

  /**
   * 初始化
   *
   * @protected
   * @return {*}  {Promise<void>}
   * @memberof HtmlEditorController
   */
  protected async onInit(): Promise<void> {
    await super.onInit();
    if (this.editorParams) {
      const {
        uploadParams,
        exportParams,
        SHOWTOOLBAR,
        VALUEMODE,
        IMAGEMODE,
        MODULES,
        DEFAULTHEIGHT,
        SHOWCOLLAPSE,
      } = this.editorParams;

      if (uploadParams) {
        try {
          this.uploadParams = JSON.parse(uploadParams);
        } catch (error) {
          ibiz.log.error(
            `编辑器[${ibiz.log.error(
              error,
            )}]编辑器参数 uploadParams 非 json 格式`,
          );
        }
      }
      if (exportParams) {
        try {
          this.exportParams = JSON.parse(exportParams);
        } catch (error) {
          ibiz.log.error(
            `编辑器[${ibiz.log.error(
              error,
            )}]编辑器参数 exportParams 非 json 格式`,
          );
        }
      }
      if (SHOWTOOLBAR) {
        this.showToolbar = this.toBoolean(SHOWTOOLBAR);
      }
      if (VALUEMODE) {
        this.valueMode = VALUEMODE.toLowerCase();
      }
      if (IMAGEMODE) {
        this.imageMode = IMAGEMODE.toLowerCase();
      }
      if (MODULES) {
        this.modules = ScriptFactory.execScriptFn(
          { controller: this },
          MODULES,
        ) as IData;
      }
      if (DEFAULTHEIGHT) {
        this.defaultHeight = Number(DEFAULTHEIGHT);
      }
      if (SHOWCOLLAPSE) {
        this.showCollapse = this.toBoolean(SHOWCOLLAPSE);
      }
    }
  }
}
