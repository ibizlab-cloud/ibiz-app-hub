/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */
import { CoreConst, HttpError, getAppCookie } from '@ibiz-template/core';
import { computed, ComputedRef, Ref, ref, watch } from 'vue';
import { UploadEditorController } from '../upload-editor.controller';

/**
 * Vant的Upload适配逻辑
 *
 * @author lxm
 * @date 2022-11-17 16:11:12
 * @export
 * @param {IParams} props
 * @param {(_value: string | null) => {}} valueChange
 * @param {UploadEditorController} c
 * @returns {*}
 */
export function useVanUpload(
  props: IParams,
  valueChange: (_value: string | null) => void,
  c: UploadEditorController,
): {
  uploadUrl: Ref<string>;
  downloadUrl: Ref<string>;
  headers: Ref<IData>;
  files: Ref<
    {
      id: string;
      name: string;
      url?: string | undefined;
    }[]
  >;
  limit: ComputedRef<1 | 9999>;
  onDownload: (file: IData) => void;
  onError: (...args: IData[]) => never;
  onRemove: (file: IData) => void;
  onSuccess: (response: IData) => void;
  beforeUpload: () => void;
  afterRead: (file: IData | IData[]) => Promise<void>;
} {
  // 文件列表
  const files: Ref<
    {
      id: string;
      name: string;
      url?: string;
    }[]
  > = ref([]);

  // 请求头
  const headers: Ref<IData> = ref({
    [`${ibiz.env.tokenHeader}Authorization`]: `${
      ibiz.env.tokenPrefix
    }Bearer ${getAppCookie(CoreConst.TOKEN)}`,
  });

  // 上传文件路径
  const uploadUrl: Ref<string> = ref('');

  // 下载文件路径
  const downloadUrl: Ref<string> = ref('');

  // 值响应式变更
  watch(
    () => props.value,
    newVal => {
      files.value = !newVal ? [] : JSON.parse(newVal);
    },
    { immediate: true },
  );

  // data响应式变更基础路径
  watch(
    () => props.data,
    newVal => {
      if (newVal) {
        const urls = ibiz.util.file.calcFileUpDownUrl(
          c.context,
          c.params,
          newVal,
          c.editorParams,
        );
        uploadUrl.value = urls.uploadUrl;
        downloadUrl.value = urls.downloadUrl;
      }
    },
    { immediate: true, deep: true },
  );

  watch(
    files,
    newVal => {
      // 变更后且下载基础路径存在时解析
      if (newVal?.length && downloadUrl.value) {
        newVal.forEach((file: IData) => {
          file.url = file.url || downloadUrl.value.replace('%fileId%', file.id);
        });
      }
    },
    { immediate: true },
  );

  watch(
    downloadUrl,
    newVal => {
      // 变更后且下载基础路径存在时解析
      if (newVal && files.value.length) {
        files.value.forEach((file: IData) => {
          file.url = downloadUrl.value.replace('%fileId%', file.id);
        });
      }
    },
    { immediate: true },
  );

  /**
   * 抛出值变更事件，根据files计算value
   *
   * @author lxm
   * @date 2022-11-17 14:11:54
   */
  const emitValue = () => {
    const _files = [...files.value];
    const value: string | null =
      _files.length > 0
        ? JSON.stringify(_files.map(file => ({ name: file.name, id: file.id })))
        : null;
    valueChange(value);
  };

  // 上传前回调
  const beforeUpload = () => {
    // 单项的情况直接阻止上传
    if (!c.multiple && files.value.length === 1) {
      return false;
    }
    return true;
  };

  // 上传成功回调
  const onSuccess = (response: IData) => {
    if (!response) {
      return;
    }
    files.value.push({
      name: response.filename,
      id: response.fileid,
    });

    // 回调都结束后抛出值变更
    emitValue();
  };

  // 上传失败回调
  const onError = (...args: IData[]) => {
    const error = args[0];
    throw new HttpError({
      response: { data: JSON.parse(error.message), status: error.status },
    } as any);
  };

  // 删除回调
  const onRemove = (file: IData) => {
    if (props.disabled) {
      return;
    }
    const index = files.value.findIndex(item => item.id === file.id);
    if (index !== -1) {
      files.value.splice(index, 1);
    }
    emitValue();
  };

  const uploadFile = (file: IData) => {
    console.log(file);
    // 创建一个空对象实例
    const formData = new FormData();
    // 调用append()方法添加数据
    formData.append('file', file.file);
    return new Promise((resolve, reject) => {
      ibiz.net
        .axios({
          url: uploadUrl.value,
          method: 'POST',
          data: formData,
          headers: headers.value,
        })
        .then(res => {
          if (res.status === 200) {
            console.log(88, res);
            onSuccess(res.data);
            resolve(true);
          } else {
            onError(res);
            reject();
          }
        })
        .catch(() => {
          reject();
        });
    });
  };

  // 读取成功回调
  const afterRead = async (file: IData | IData[]) => {
    if (file.length && file.length > 0) {
      for (let i = 0; i < file.length; i++) {
        const fi = (file as IData[])[i];
        // eslint-disable-next-line no-await-in-loop
        await uploadFile(fi);
      }
    } else {
      await uploadFile(file);
    }
  };

  // 下载文件
  const onDownload = (file: IData) => {
    const url = file.url || downloadUrl.value.replace('%fileId%', file.id);
    c.fileDownload({ url, name: file.name });
  };

  // 允许上传文件的最大数量
  const limit = computed(() => {
    return c.multiple ? 9999 : 1;
  });

  return {
    uploadUrl,
    downloadUrl,
    headers,
    files,
    limit,
    onDownload,
    onError,
    onRemove,
    onSuccess,
    beforeUpload,
    afterRead,
  };
}
