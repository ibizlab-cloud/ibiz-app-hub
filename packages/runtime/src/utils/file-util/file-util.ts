/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CoreConst,
  IHttpResponse,
  RuntimeError,
  downloadFileFromBlob,
  getAppCookie,
} from '@ibiz-template/core';
import qs from 'qs';
import { convertNavData } from '../nav-params/nav-params';
import { IApiFileUtil } from '../../interface';

/**
 * @description 文件工具类
 * @export
 * @class FileUtil
 * @implements {IApiFileUtil}
 */
export class FileUtil implements IApiFileUtil {
  /**
   * @description 自定义文件上传请求头数据
   * @protected
   * @type {Record<string, string>}
   * @memberof FileUtil
   */
  protected customUploadHeaders: Record<string, string> = {};

  /**
   * @description 设置文件上传请求头数据
   * @param {Record<string, string>} args
   * @memberof FileUtil
   */
  setUploadHeaders(args: Record<string, string>): void {
    Object.assign(this.customUploadHeaders, args);
  }

  /**
   * @description 获取文件上传请求头数据
   * @returns {*}  {Record<string, string>}
   * @memberof IApiFileUtil
   */
  getUploadHeaders(): Record<string, string> {
    const uploadHeaders: Record<string, string> = {};
    // 预定义请求头数据
    const token = getAppCookie(CoreConst.TOKEN);
    if (token) {
      Object.assign(uploadHeaders, {
        [`${ibiz.env.tokenHeader}Authorization`]: `${ibiz.env.tokenPrefix}Bearer ${token}`,
      });
    }
    // 自定义请求头数据
    if (
      this.customUploadHeaders &&
      Object.keys(this.customUploadHeaders).length > 0
    ) {
      Object.assign(uploadHeaders, {
        ...this.customUploadHeaders,
      });
    }
    return uploadHeaders;
  }

  /**
   * @description 计算OSSCat参数
   * @protected
   * @param {string} url
   * @param {IContext} context
   * @param {string} [OSSCatName]
   * @returns {*}  {string}
   * @memberof FileUtil
   */
  protected calcOSSCatUrl(
    url: string,
    context: IContext,
    OSSCatName?: string,
  ): string {
    let uploadUrl = `${ibiz.env.baseUrl}/${ibiz.env.appId}${url}`;
    const app = ibiz.hub.getApp(context.srfappid);
    const OSSCat =
      OSSCatName ||
      app.model.defaultOSSCat ||
      app.model.userParam?.DefaultOSSCat;
    uploadUrl = uploadUrl.replace('/{cat}', OSSCat ? `/${OSSCat}` : '');
    return uploadUrl;
  }

  /**
   * @description 计算文件的上传路径和下载路径,下载路径文件id用%fileId%占位，替换即可;配置编辑器参数uploadParams和exportParams时，会像导航参数一样动态添加对应的参数到url上
   * @param {IContext} context
   * @param {IParams} params
   * @param {IData} [data={}]
   * @param {IData} [extraParams={}]
   * @returns {*}  {{
   *     uploadUrl: string;
   *     downloadUrl: string;
   *   }}
   * @memberof FileUtil
   */
  calcFileUpDownUrl(
    context: IContext,
    params: IParams,
    data: IData = {},
    extraParams: IData = {},
  ): {
    uploadUrl: string;
    downloadUrl: string;
  } {
    const { uploadParams, exportParams, osscat: OSSCatName } = extraParams;
    // 计算文件上传路径
    let uploadUrl = this.calcOSSCatUrl(
      ibiz.env.uploadFileUrl,
      context,
      OSSCatName,
    );
    let downloadUrl = this.calcOSSCatUrl(
      `${ibiz.env.downloadFileUrl}/%fileId%`,
      context,
      OSSCatName,
    );
    let _uploadParams: IParams = {};
    let _exportParams: IParams = {};
    if (uploadParams) {
      _uploadParams = convertNavData(uploadParams, data, params, context);
    }
    if (exportParams) {
      _exportParams = convertNavData(exportParams, data, params, context);
    }
    uploadUrl += qs.stringify(_uploadParams, { addQueryPrefix: true });
    downloadUrl += qs.stringify(_exportParams, { addQueryPrefix: true });
    return { uploadUrl, downloadUrl };
  }

  /**
   * @description 请求url获取文件流，并用JS触发文件下载
   * @param {string} url
   * @param {string} [name]
   * @returns {*}  {Promise<void>}
   * @memberof FileUtil
   */
  async fileDownload(url: string, name?: string): Promise<void> {
    // 发送get请求
    const response = await ibiz.net.request(url, {
      method: 'get',
      responseType: 'blob',
      baseURL: '', // 已经有baseURL了，这里无需再写
    });

    if (response.status !== 200) {
      throw new RuntimeError(ibiz.i18n.t('runtime.platform.failedDownload'));
    }
    // 请求成功，后台返回的是一个文件流
    if (!response.data) {
      throw new RuntimeError(ibiz.i18n.t('runtime.platform.fileStreamData'));
    } else {
      // 获取文件名
      let fileName = ibiz.util.file.getFileName(response);
      // 外部传名称以外部为准，需要带文件后缀名
      if (name) fileName = name;
      downloadFileFromBlob(response.data as Blob, fileName);
    }
  }

  /**
   * @description 文件上传
   * @param {string} uploadUrl
   * @param {Blob} file
   * @param {IData} headers
   * @returns {*}  {Promise<IData>}
   * @memberof FileUtil
   */
  async fileUpload(
    uploadUrl: string,
    file: Blob,
    headers: IData,
  ): Promise<IData> {
    const formData = new FormData();
    formData.append('file', file);
    const res = await ibiz.net.axios({
      url: uploadUrl,
      method: 'post',
      headers,
      data: formData,
    });
    if (res.status !== 200) {
      throw new RuntimeError(
        ibiz.i18n.t('runtime.utils.fileUtil.fileUploadFailed'),
      );
    }
    return res.data;
  }

  /**
   * @description 获取文件名
   * @param {IHttpResponse<IData>} response
   * @returns {*}  {string}
   * @memberof FileUtil
   */
  getFileName(response: IHttpResponse<IData>): string {
    let fileName = '';
    const contentDisposition = response.headers['content-disposition'];
    if (!contentDisposition) {
      return fileName;
    }
    const disposition = qs.parse(contentDisposition, {
      delimiter: ';',
    });
    if (disposition && disposition.filename) {
      fileName = disposition.filename as string;
    }
    // 特殊处理返回的文件名带有双引号
    if (fileName.startsWith('"') && fileName.endsWith('"')) {
      fileName = fileName.substring(1, fileName.length - 1);
    }
    return fileName;
  }

  /**
   * @description 选择文件并上传
   * @param {IContext} context
   * @param {IParams} params
   * @param {IData} data
   * @param {IData} [option={}]
   * @returns {*}  {Promise<IData[]>}
   * @memberof FileUtil
   */
  async chooseFileAndUpload(
    context: IContext,
    params: IParams,
    data: IData,
    option: IData = {},
  ): Promise<IData[]> {
    const { accept, multiple, showUploadManager, extraParams } = option;
    const urls = ibiz.util.file.calcFileUpDownUrl(
      context,
      params,
      data,
      extraParams,
    );
    const files = await ibiz.util.file.chooseFile(accept, multiple);
    let promises: IData[] = [];
    const headers = this.getUploadHeaders();
    if (showUploadManager) {
      promises = await ibiz.notification.uploadManager({
        uploadUrl: urls.uploadUrl,
        files,
        headers,
      });
      return promises;
    }
    for (let i = 0; i < files.length; i++) {
      const promise = await ibiz.util.file.fileUpload(
        urls.uploadUrl,
        files[i],
        headers,
      );
      promises.push(promise);
    }
    return Promise.all(promises);
  }

  /**
   * @description 选择文件
   * @param {string} [accept='']
   * @param {boolean} [multiple=false]
   * @returns {*}  {Promise<FileList>}
   * @memberof FileUtil
   */
  chooseFile(
    accept: string = '',
    multiple: boolean = false,
  ): Promise<FileList> {
    return new Promise(resolve => {
      // 创建 input 元素
      const inputElement = document.createElement('input');
      inputElement.type = 'file';
      inputElement.accept = accept;
      inputElement.multiple = multiple;
      inputElement.webkitdirectory = false;
      // 添加事件监听器，处理文件上传逻辑
      inputElement.addEventListener('change', (e: IData) => {
        resolve(e.target.files);
      });

      // 将 input 元素添加到页面中
      document.body.appendChild(inputElement);

      // 执行文件上传操作
      inputElement.click();

      // 方法结束后销毁 input 元素
      document.body.removeChild(inputElement);
    });
  }
}
