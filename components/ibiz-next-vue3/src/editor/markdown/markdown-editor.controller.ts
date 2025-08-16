import { RuntimeModelError } from '@ibiz-template/core';
import {
  EditorController,
  IAppDEService,
  getDeACMode,
} from '@ibiz-template/runtime';
import { IAppDEACMode, IDEACModeDataItem, IMarkdown } from '@ibiz/model-core';

/**
 * MarkDown编辑器控制器
 *
 * @export
 * @class MarkDownEditorController
 * @extends {EditorController}
 */
export class MarkDownEditorController extends EditorController<IMarkdown> {
  /**
   * 上传参数
   */
  public uploadParams?: IParams;

  /**
   * 下载参数
   */
  public exportParams?: IParams;

  /**
   * 应用实体服务
   *
   * @author chitanda
   * @date 2023-10-12 14:10:41
   * @type {IAppDEService}
   */
  deService?: IAppDEService;

  /**
   * 自填模式
   *
   * @author chitanda
   * @date 2023-10-12 10:10:52
   * @type {IAppDEACMode}
   */
  deACMode?: IAppDEACMode;

  /**
   * 自填模式对应主键属性名称
   *
   * @author chitanda
   * @date 2023-10-12 10:10:58
   * @type {string}
   */
  keyName: string = 'srfkey';

  /**
   * 自填模式对应主文本属性名称
   *
   * @author chitanda
   * @date 2023-10-12 10:10:02
   * @type {string}
   */
  textName: string = 'srfmajortext';

  /**
   * 自填模式排序模式，默认升序
   *
   * @author chitanda
   * @date 2023-10-12 10:10:29
   * @type {string}
   */
  sort: string = 'asc';

  /**
   * 自填数据项集合（已排除了value和text)
   *
   * @author chitanda
   * @date 2023-10-12 10:10:23
   * @type {IDEACModeDataItem[]}
   */
  dataItems: IDEACModeDataItem[] = [];

  /**
   * AI 聊天自填模式
   *
   * @author chitanda
   * @date 2023-10-12 10:10:37
   * @type {boolean}
   */
  chatCompletion: boolean = false;

  protected async onInit(): Promise<void> {
    await super.onInit();

    // 没配高度默认给600px
    if (!this.style.height) {
      this.style.height = '600px';
    }

    if (this.editorParams) {
      const { uploadparams, exportparams } = this.editorParams;

      if (uploadparams) {
        try {
          this.uploadParams = JSON.parse(uploadparams);
        } catch (error) {
          throw new RuntimeModelError(
            uploadparams,
            ibiz.i18n.t('editor.markdown.uploadJsonFormatErr'),
          );
        }
      }
      if (exportparams) {
        try {
          this.exportParams = JSON.parse(exportparams);
        } catch (error) {
          throw new RuntimeModelError(
            exportparams,
            ibiz.i18n.t('editor.markdown.exportJsonFormatErr'),
          );
        }
      }
    }

    // 解析自填模式相关模型
    const model = this.model;
    if (model.appDEACModeId) {
      this.deACMode = await getDeACMode(
        model.appDEACModeId,
        model.appDataEntityId!,
        this.context.srfappid,
      );
      if (this.deACMode) {
        if (this.deACMode.actype === 'AUTOCOMPLETE') {
          // 自填模式相关
          const { minorSortAppDEFieldId, minorSortDir } = this.deACMode;
          if (minorSortAppDEFieldId && minorSortDir) {
            this.sort = `${minorSortAppDEFieldId.toLowerCase()},${minorSortDir.toLowerCase()}`;
          }
          if (this.deACMode.textAppDEFieldId) {
            this.textName = this.deACMode.textAppDEFieldId;
          }
          if (this.deACMode.valueAppDEFieldId) {
            this.keyName = this.deACMode.valueAppDEFieldId;
          }
          if (this.deACMode.deacmodeDataItems) {
            this.dataItems = [];
            this.deACMode.deacmodeDataItems.forEach(
              (dataItem: IDEACModeDataItem) => {
                if (dataItem.id !== 'value' && dataItem.id !== 'text') {
                  this.dataItems.push(dataItem);
                }
              },
            );
          }
        }
        if (this.deACMode.actype === 'CHATCOMPLETION') {
          this.deService = await ibiz.hub
            .getApp(model.appId)
            .deService.getService(this.context, model.appDataEntityId!);
          this.chatCompletion = true;
        }
      }
    }
  }
}
