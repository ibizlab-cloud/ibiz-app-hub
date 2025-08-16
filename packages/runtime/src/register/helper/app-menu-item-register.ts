import { IAppMenuItem } from '@ibiz/model-core';
import { getPluginRegisterKey } from './common-register';
import { IAppMenuItemProvider } from '../../interface';

/** 应用菜单项适配器前缀 */
export const APPMENUITEM_PROVIDER_PREFIX = 'APPMENUITEM';

/**
 * 注册应用菜单项适配器
 *
 * @author lxm
 * @date 2023-05-06 09:14:16
 * @export
 * @param {string} key
 * @param {() => IAppMenuItemProvider} callback 生成界面行为适配器的回调
 */
export function registerAppMenuItemProvider(
  key: string,
  callback: () => IAppMenuItemProvider,
): void {
  ibiz.register.register(`${APPMENUITEM_PROVIDER_PREFIX}_${key}`, callback);
}

function getProvider(key: string): IAppMenuItemProvider | undefined {
  return ibiz.register.get(
    `${APPMENUITEM_PROVIDER_PREFIX}_${key}`,
  ) as IAppMenuItemProvider;
}

/**
 * 获取应用菜单项适配器
 *
 * @author chitanda
 * @date 2023-11-01 17:11:43
 * @export
 * @param {IAppMenuItem} model
 * @return {*}  {Promise<IAppMenuItemProvider>}
 */
export async function getAppMenuItemProvider(
  model: IAppMenuItem,
): Promise<IAppMenuItemProvider | undefined> {
  let provider: IAppMenuItemProvider | undefined;
  const { sysPFPluginId, appId, itemType } = model as Required<IAppMenuItem>;

  // 找插件适配器
  if (sysPFPluginId) {
    const pluginKey = await getPluginRegisterKey(sysPFPluginId, appId);
    if (pluginKey) {
      provider = getProvider(pluginKey);
    }
    if (!provider) {
      ibiz.log.warn(
        ibiz.i18n.t('runtime.register.helper.applicationMenu', {
          pluginKey,
        }),
      );
    } else {
      return provider;
    }
  }

  // 找应用菜单项类型
  provider = getProvider(itemType);
  return provider;
}
