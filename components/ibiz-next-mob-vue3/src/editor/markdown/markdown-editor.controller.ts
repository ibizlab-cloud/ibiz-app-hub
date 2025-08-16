import {
  downloadFileFromBlob,
  RuntimeError,
  RuntimeModelError,
} from '@ibiz-template/core';
import { EditorController, convertNavData } from '@ibiz-template/runtime';
import { IMarkdown } from '@ibiz/model-core';
import qs from 'qs';

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

  protected async onInit(): Promise<void> {
    await super.onInit();

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
  }

  /**
   * 计算文件的上传路径和下载路径
   * 下载路径文件id用%fileId%占位，替换即可
   * 配置编辑器参数uploadParams和exportParams时，会像导航参数一样动态添加对应的参数到url上
   *
   * @author lxm
   * @date 2022-11-17 13:11:43
   * @param {IData} data
   * @returns {*}  {{ uploadUrl: string; downloadUrl: string }}
   */
  calcBaseUrl(data: IData): { uploadUrl: string; downloadUrl: string } {
    let uploadUrl = `${ibiz.env.baseUrl}/${ibiz.env.appId}${ibiz.env.uploadFileUrl}`;
    let downloadUrl = `${ibiz.env.baseUrl}/${ibiz.env.appId}${ibiz.env.downloadFileUrl}/%fileId%`;
    let uploadParams: IParams = {};
    let exportParams: IParams = {};
    if (this.uploadParams) {
      uploadParams = convertNavData(
        this.uploadParams,
        data,
        this.params,
        this.context,
      );
    }
    if (this.exportParams) {
      exportParams = convertNavData(
        this.exportParams,
        data,
        this.params,
        this.context,
      );
    }
    uploadUrl += qs.stringify(uploadParams, { addQueryPrefix: true });
    downloadUrl += qs.stringify(exportParams, { addQueryPrefix: true });

    return { uploadUrl, downloadUrl };
  }

  /**
   * 请求url获取文件流，并用JS触发文件下载
   *
   * @author lxm
   * @date 2022-11-17 14:11:09
   * @param {string} url
   * @param {IData} file
   */
  fileDownload(file: { url: string; name: string }): void {
    // 发送get请求
    ibiz.net
      .request(file.url, {
        method: 'get',
        responseType: 'blob',
        baseURL: '', // 已经有baseURL了，这里无需再写
      })
      .then((response: IData) => {
        if (response.status !== 200) {
          throw new RuntimeError(
            ibiz.i18n.t('editor.markdown.downloadFailedErr'),
          );
        }
        // 请求成功，后台返回的是一个文件流
        if (!response.data) {
          throw new RuntimeError(ibiz.i18n.t('editor.markdown.noExistentErr'));
        } else {
          // 获取文件名
          const fileName = file.name;
          downloadFileFromBlob(response.data, fileName);
        }
      });
  }
}
