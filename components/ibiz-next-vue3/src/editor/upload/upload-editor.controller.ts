import { RuntimeModelError } from '@ibiz-template/core';
import { EditorController } from '@ibiz-template/runtime';
import { IFileUploader } from '@ibiz/model-core';

/**
 * 文件上传编辑器控制器
 * @return {*}
 * @author: zhujiamin
 * @Date: 2022-08-25 10:57:58
 */
export class UploadEditorController extends EditorController<IFileUploader> {
  /**
   * 是否支持拖拽
   */
  public isDrag: boolean = false;

  /**
   * 是否多选
   */
  public multiple: boolean = true;

  /**
   * 接受上传的文件类型
   */
  public accept: string = '';

  /**
   * 上传的文件大小
   *
   * @type {number}
   * @memberof UploadEditorController
   */
  public size: number = 0;

  /**
   * 上传参数
   */
  public uploadParams?: IParams;

  /**
   * 下载参数
   */
  public exportParams?: IParams;

  /**
   * 自适应预览
   * 只读状态下且配置了编辑器参数autoPreview ，加载完图片后自动调整大小达到预览态，且禁用图片hover工具栏
   *
   * @type {boolean}
   * @memberof UploadEditorController
   */
  public autoPreview: boolean = false;

  protected async onInit(): Promise<void> {
    await super.onInit();
    // 图片类型增加图片类型限制
    if (this.model.editorType?.includes('PICTURE')) {
      this.accept = 'image/*';
    }

    // 单项的编辑器类型的设置单选
    if (
      [
        'FILEUPLOADER_ONE',
        'PICTURE_ONE',
        'PICTURE_ONE_RAW',
        'MOBSINGLEFILEUPLOAD',
        'MOBPICTURE_RAW',
      ].includes(this.model.editorType!)
    ) {
      this.multiple = false;
    }
    if (this.editorParams) {
      const {
        isDrag,
        multiple,
        accept,
        size,
        uploadParams,
        exportParams,
        autoPreview,
        isdrag,
        uploadparams,
        exportparams,
        autopreview,
      } = this.editorParams;
      if (isDrag) {
        this.isDrag = Boolean(isDrag);
      }
      if (isdrag) {
        this.isDrag = Boolean(isdrag);
      }
      if (autoPreview) {
        this.autoPreview = autoPreview;
      }
      if (autopreview) {
        this.autoPreview = autopreview;
      }
      if (multiple) {
        this.multiple = Boolean(multiple);
      }
      if (accept) {
        this.accept = accept;
      }
      if (size) {
        this.size = Number(size);
      }
      if (uploadParams) {
        try {
          this.uploadParams = JSON.parse(uploadParams);
        } catch (error) {
          throw new RuntimeModelError(
            uploadParams,
            ibiz.i18n.t('editor.upload.uploadJsonFormatErr'),
          );
        }
      }
      if (uploadparams) {
        try {
          this.uploadParams = JSON.parse(uploadparams);
        } catch (error) {
          throw new RuntimeModelError(
            uploadparams,
            ibiz.i18n.t('editor.upload.uploadJsonFormatErr'),
          );
        }
      }
      if (exportParams) {
        try {
          this.exportParams = JSON.parse(exportParams);
        } catch (error) {
          throw new RuntimeModelError(
            exportParams,
            ibiz.i18n.t('editor.upload.exportJsonFormatErr'),
          );
        }
      }
      if (exportparams) {
        try {
          this.exportParams = JSON.parse(exportparams);
        } catch (error) {
          throw new RuntimeModelError(
            exportparams,
            ibiz.i18n.t('editor.upload.exportJsonFormatErr'),
          );
        }
      }
    }
  }
}
