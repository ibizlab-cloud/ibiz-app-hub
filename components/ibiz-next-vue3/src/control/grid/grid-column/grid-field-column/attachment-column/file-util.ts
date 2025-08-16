/* eslint-disable @typescript-eslint/no-explicit-any */
import { Ref, ref, watch } from 'vue';
import { isString } from 'lodash-es';
import { GridFieldColumnController } from '@ibiz-template/runtime';

/** 文件总类型定义 */
type FileType = 'image' | 'pdf' | 'other';

/**
 * 获取文件类型
 */
export const getFileType = (extension: string): FileType => {
  switch (extension) {
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
    case 'bmp':
    case 'svg':
    case 'webp':
    case 'jfif':
      // 图片类型
      return 'image';
    case 'pdf':
      // pdf 类型
      return 'pdf';
    default:
      // 其它文件类型
      return 'other';
  }
};

/**
 * 文件内容解析的适配逻辑
 *
 * @export
 * @param {IParams} props
 * @param {UploadEditorController} c
 * @returns {*}
 */
export function useFilesParse(
  props: IParams,
  c: GridFieldColumnController,
): {
  uploadUrl: Ref<string>;
  downloadUrl: Ref<string>;
  files: Ref<
    {
      id: string;
      name: string;
      url?: string | undefined;
      base64?: string | undefined;
    }[]
  >;
  onDownload: (file: IData) => void;
} {
  // 文件列表
  const files: Ref<
    {
      id: string;
      name: string;
      url?: string;
      base64?: string;
    }[]
  > = ref([]);

  // 上传文件路径
  const uploadUrl: Ref<string> = ref('');

  // 下载文件路径
  const downloadUrl: Ref<string> = ref('');

  // svg图片Blob路径存储
  const svgBlob: Map<string, string> = new Map();

  // 获取svg以data:image开头的预览路径
  const fetchSVGAsBase64 = async (url: string): Promise<void | string> => {
    try {
      // 发起请求获取 SVG 文件
      const response = await fetch(url);

      // 检查响应状态
      if (!response.ok) {
        throw new Error(`Failed to fetch SVG: ${response.status}`);
      }

      // 读取响应体为 Blob
      const blob = await response.blob();

      // 将 Blob 转换为 base-64 编码的字符串
      const reader = new FileReader();
      return new Promise((resolve, reject) => {
        reader.onloadend = (): void => {
          const base64String = reader.result as string;
          // 添加正确的 MIME 类型前缀
          if (base64String) {
            const dataURL = base64String.replace(
              'data:application/octet-stream;base64',
              'data:image/svg+xml;base64',
            );
            resolve(dataURL);
          }
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      ibiz.log.error((error as IData)?.message);
      throw error;
    }
  };

  // 计算svg的预览路径
  const calcSvgPreview = (file: IData): void => {
    const blob = svgBlob.get(file.id);
    if (blob) {
      Object.assign(file, { base64: blob });
    } else {
      fetchSVGAsBase64(file.url).then(base64String => {
        Object.assign(file, { base64: base64String });
      });
    }
  };

  // 下载文件
  const onDownload = (file: IData): void => {
    const url = file.url || downloadUrl.value.replace('%fileId%', file.id);
    ibiz.util.file.fileDownload(url, file.name);
  };

  // 值响应式变更
  watch(
    () => props.value,
    newVal => {
      // eslint-disable-next-line no-nested-ternary
      files.value = !newVal
        ? []
        : isString(newVal)
          ? JSON.parse(newVal)
          : newVal;
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
          {},
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
          Object.assign(file, {
            url: file.url || downloadUrl.value.replace('%fileId%', file.id),
          });
          if (file.name.split('.').pop() === 'svg') {
            calcSvgPreview(file);
          }
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
          Object.assign(file, {
            url: downloadUrl.value.replace('%fileId%', file.id),
          });
          if (file.name.split('.').pop() === 'svg') {
            calcSvgPreview(file);
          }
        });
      }
    },
    { immediate: true },
  );

  return {
    files,
    uploadUrl,
    onDownload,
    downloadUrl,
  };
}
