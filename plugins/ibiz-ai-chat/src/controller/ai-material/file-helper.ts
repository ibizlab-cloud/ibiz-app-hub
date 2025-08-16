/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  FileUploaderOptions,
  IChatToolbarItem,
  IMaterial,
} from '../../interface';
import { FileUploader } from '../../utils';
import { MaterialHelper } from './material-helper';

export class FileHelper extends MaterialHelper {
  /**
   * 执行操作
   *
   * @author tony001
   * @date 2025-02-28 15:02:27
   * @return {*}  {Promise<void>}
   */
  async excuteAction(
    event: MouseEvent,
    item?: IChatToolbarItem,
  ): Promise<void> {
    const uploader = this.aiChat.opts.uploader;
    const {
      multiple,
      accept,
      maxSize,
      onSelect,
      onUpload,
      onSuccess,
      onError,
      onProgress,
    } = uploader;

    const fileUploadOptions: FileUploaderOptions<object> = {
      multiple: multiple || true,
      accept: accept || '*/*',
      maxSize: maxSize || 5 * 1024 * 1024,
      onSelect: (files: File[]) => {
        onSelect?.(files);
        if (files.length > 0) {
          files.forEach(file => {
            const material = this.buildMaterialObject(file);
            Object.assign(material.metadata, { state: 'uploading' });
            this.aiChat.addMaterial(material);
          });
        }
      },
      onUpload: async (
        file: File,
        reportProgress: (percent: number) => void,
      ) => {
        return onUpload(file, reportProgress, {
          context: this.aiChat.context,
          params: this.aiChat.params,
        });
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onSuccess: (result: any, file: File) => {
        const material = {
          id: result.id,
          type: 'ossfile',
          data: {
            id: result.id,
            name: result.name,
          },
          metadata: {
            ext: result.ext,
            fileext: result.fileext,
            fileid: result.fileid,
            filename: result.filename,
            size: result.size,
            filesize: result.filesize,
            state: 'successed',
          },
        };
        this.aiChat.replaceMaterial(file.name, material);
        onSuccess?.(result, file);
      },
      onError: (error: Error, file: File) => {
        const material = this.buildMaterialObject(file);
        Object.assign(material.metadata, { state: 'failed' });
        this.aiChat.replaceMaterial(file.name, material);
        onError?.(error, file);
      },
      onProgress: (file: File, percent: number) => {
        onProgress?.(file, percent);
      },
    };
    const fileUploader = new FileUploader(fileUploadOptions);
    // 触发文件选择
    fileUploader.openFilePicker();
  }

  /**
   * 构建素材对象
   *
   * @author tony001
   * @date 2025-02-28 15:02:12
   * @param {File} file
   * @return {*}  {IMaterial}
   */
  buildMaterialObject(file: File): IMaterial {
    return {
      id: file.name,
      type: 'ossfile',
      data: {
        name: file.name,
        id: file.name,
      },
      metadata: {
        size: file.size,
        type: file.type,
        lastModified: file.lastModified,
      },
    };
  }
}
