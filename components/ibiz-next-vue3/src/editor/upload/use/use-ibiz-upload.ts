/* eslint-disable no-param-reassign */
import {
  HttpResponse,
  isImage,
  IUploadFile,
  uploadFile,
} from '@ibiz-template/core';
import { Ref, ref, watch } from 'vue';
import { UploadEditorController } from '../upload-editor.controller';

export type FileInfo = {
  name: string;
  id: string;
  status?: 'uploading' | 'finished' | 'fail' | 'cancel';
  percentage?: number;
  url?: string;
  /**
   * 文件名（不带后缀）
   */
  fileName?: string;
  /**
   * 文件类型（拓展名）
   */
  fileExt?: string;
  /**
   * 是否是图片
   */
  isImage?: boolean;
};

/**
 * 格式化文件信息
 *
 * @author lxm
 * @date 2022-11-18 15:11:38
 * @param {FileInfo} file
 */
export function formatFileInfo(file: FileInfo, downloadUrl: string): FileInfo {
  file.url = downloadUrl.replace('%fileId%', file.id!);
  if (!file.status) {
    // 不存在时为回填回来的数据默认给他finished
    file.status = 'finished';
  }
  if (!file.fileName) {
    const index = file.name.lastIndexOf('.');
    file.fileName = file.name.substring(0, index);
    file.fileExt = file.name.substring(index);
    file.isImage = isImage(file.name);
  }
  return file as FileInfo;
}

/**
 * 文件上传组件初始化，解析props并得到downloadUrl、uploadUrl、fileList
 *
 * @author lxm
 * @date 2022-11-21 10:11:01
 * @export
 * @param {{
 *   data: Ref<IData>;
 *   value: Ref<string>;
 *   controller: Ref<UploadEditorController>;
 * }} props
 * @returns {*}
 */
export function useIBizUploadInit(props: {
  data: Ref<IData>;
  value: Ref<string | undefined>;
  controller: Ref<UploadEditorController>;
}): {
  downloadUrl: Ref<string>;
  uploadUrl: Ref<string>;
  valueList: Ref<FileInfo[]>;
} {
  // 上传文件路径
  const uploadUrl: Ref<string> = ref('');

  // 下载文件路径
  const downloadUrl: Ref<string> = ref('');

  // 文件列表
  const valueList: Ref<FileInfo[]> = ref([]);

  // data响应式变更基础路径
  watch(
    props.data,
    newVal => {
      if (newVal) {
        const urls = ibiz.util.file.calcFileUpDownUrl(
          props.controller.value.context,
          props.controller.value.params,
          newVal,
          props.controller.value.editorParams,
        );
        uploadUrl.value = urls.uploadUrl;
        downloadUrl.value = urls.downloadUrl;
      }
    },
    { immediate: true, deep: true },
  );

  // 值响应式变更
  watch(
    props.value,
    newVal => {
      valueList.value = !newVal ? [] : JSON.parse(newVal);
      if (valueList.value.length && downloadUrl.value) {
        valueList.value.forEach((file: FileInfo) => {
          formatFileInfo(file, downloadUrl.value);
        });
      }
    },
    { immediate: true },
  );

  watch(
    downloadUrl,
    newVal => {
      // 下载基础路径变更时全部url重算
      if (newVal && valueList.value.length) {
        valueList.value.forEach((file: FileInfo) => {
          formatFileInfo(file, newVal);
        });
      }
    },
    { immediate: true },
  );

  return {
    downloadUrl,
    uploadUrl,
    valueList,
  };
}

/**
 * 使用文件上传功能，传递外部已存在的文件集合，上传下载基础路径
 *
 * @author lxm
 * @date 2022-11-21 10:11:01
 * @export
 * @param {{
 *   downloadUrl: Ref<string>;
 *   uploadUrl: Ref<string>;
 *   value: Ref<
 *     {
 *       name: string;
 *       id: string;
 *       url?: string;
 *     }[]
 *   >;
 * }} opts
 * @returns {*}
 */
export function useIBizUpload(opts: {
  downloadUrl: Ref<string>;
  uploadUrl: Ref<string>;
  value: Ref<
    {
      name: string;
      id: string;
      url?: string;
    }[]
  >;
  multiple?: boolean;
  accept?: string;
}): {
  selectFile: () => void;
  fileList: Ref<
    {
      name: string;
      id: string;
      status?: 'uploading' | 'finished' | 'fail' | 'cancel' | undefined;
      percentage?: number | undefined;
      url?: string | undefined;
      fileName?: string | undefined;
      fileExt?: string | undefined;
      isImage?: boolean | undefined;
    }[]
  >;
  uploadState: Ref<'loading' | 'undo' | 'done'>;
} {
  const uploadState = ref<'undo' | 'loading' | 'done'>('undo');
  const fileList = ref<FileInfo[]>([]);
  const { downloadUrl, value, uploadUrl } = opts;

  // 初始化fileList
  watch(
    value,
    newVal => {
      if (newVal.length > 0) {
        fileList.value = [];
        newVal.forEach(item => {
          fileList.value.push(formatFileInfo(item, downloadUrl.value));
        });
      }
    },
    {
      immediate: true,
      deep: true,
    },
  );

  // 开始上传后记录文件
  const beforeUpload = (fileData: File[], files: IUploadFile[]) => {
    files.forEach(file => {
      fileList.value.push({
        name: file.name,
        status: file.status,
        percentage: file.percentage,
        id: file.uid,
        url: '',
      });
    });
    return true;
  };

  /**
   * 更新文件里的上传进度
   *
   * @author lxm
   * @date 2022-11-18 15:11:09
   * @param {IUploadFile[]} files
   */
  const onProgress = (files: IUploadFile[]) => {
    files.forEach(file => {
      fileList.value.find(item => {
        if (item.id === file.uid) {
          item.percentage = file.percentage;
          return true;
        }
        return false;
      });
    });
  };

  const onSuccess = (resultFiles: IUploadFile[], res: HttpResponse) => {
    // 一次上传成功这一批的文件都成功
    resultFiles.forEach(file => {
      fileList.value.find(item => {
        if (item.id === file.uid) {
          // 把用后台数据替换当前信息，并格式化信息
          item.status = file.status;
          item.id = res.data.fileid || res.data.id;
          item.name = res.data.filename || res.data.name;
          formatFileInfo(item, downloadUrl.value);
          return true;
        }
        return false;
      });
    });
  };

  const onError = (resultFiles: IUploadFile[], error: unknown) => {
    // 一次报错这一批的文件都上传失败
    resultFiles.forEach(file => {
      fileList.value.find(item => {
        if (item.id === file.uid) {
          // 更新错误状态
          item.status = file.status;
          return true;
        }
        return false;
      });
    });
    // 处理报错信息
    console.error(error);
  };

  const onFinish = (_resultFiles: IUploadFile[]) => {
    fileList.value = fileList.value.filter(file => file.status === 'finished');
    uploadState.value = 'done';
  };

  // 手动控制文件上传，绑定组件的upload
  const selectFile = () => {
    uploadFile({
      multiple: opts.multiple,
      accept: opts.accept,
      uploadUrl: uploadUrl.value,
      beforeUpload,
      progress: onProgress,
      success: onSuccess,
      error: onError,
      finish: onFinish,
    });
  };

  return {
    selectFile,
    fileList,
    uploadState,
  };
}

export function openImagePreview(file: FileInfo): Promise<void> {
  return ibiz.overlay.modal(
    'ImagePreview',
    { file },
    {
      width: 'auto',
      height: 'auto',
      placement: 'center',
      modalClass: 'ibiz-image-preview-modal',
    },
  );
}
