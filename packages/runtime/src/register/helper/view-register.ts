import { IAppView } from '@ibiz/model-core';
import { IViewProvider } from '../../interface';
import { getPluginRegisterKey } from './common-register';

/** 视图适配器前缀 */
export const VIEW_PROVIDER_PREFIX = 'VIEW';

/**
 * 注册视图适配器
 * @author lxm
 * @date 2023-05-06 09:14:16
 * @export
 * @param {string} key
 * @param {() => IViewProvider} callback 生成视图适配器的回调
 */
export function registerViewProvider(
  key: string,
  callback: () => IViewProvider,
): void {
  ibiz.register.register(`${VIEW_PROVIDER_PREFIX}_${key}`, callback);
}

function getProvider(key: string): IViewProvider | undefined {
  return ibiz.register.get(`${VIEW_PROVIDER_PREFIX}_${key}`) as IViewProvider;
}

/**
 * 获取视图适配器
 * @author lxm
 * @date 2023-05-06 09:29:23
 * @export
 * @param {IAppView} model
 * @return {*}  {Promise<IViewProvider>}
 */
export async function getViewProvider(
  model: IAppView,
): Promise<IViewProvider | undefined> {
  let provider: IViewProvider | undefined;
  const { viewType, viewStyle, sysPFPluginId, appId } =
    model as Required<IAppView>;

  // 找插件适配器
  if (sysPFPluginId) {
    const pluginKey = await getPluginRegisterKey(sysPFPluginId, appId);
    if (pluginKey) {
      provider = getProvider(pluginKey);
    }
    if (!provider) {
      ibiz.log.warn(
        ibiz.i18n.t('runtime.register.helper.viewPlugin', {
          pluginKey,
        }),
      );
    } else {
      return provider;
    }
  }

  // 再找视图类型和视图样式
  if (viewStyle && viewStyle !== 'DEFAULT') {
    const key = `${viewType}_${viewStyle}`;
    provider = getProvider(key);
    if (!provider) {
      ibiz.log.warn(
        ibiz.i18n.t('runtime.register.helper.correspondViewTypeStyle', {
          viewType,
          viewStyle,
        }),
        model,
      );
    } else {
      return provider;
    }
  }

  // 找视图类型
  if (!provider) {
    provider = getProvider(viewType);
  }

  // 默认必给的通用视图适配器
  if (!provider) {
    provider = getProvider('DEFAULT')!;
  }
  return provider;
}
