import { calcDeCodeNameById } from '../model';
import { IRegisterParams } from '../interface';
import {
  CONTROL_PROVIDER_PREFIX,
  FORMDETAIL_PROVIDER_PREFIX,
  GRIDCOLUMN_PROVIDER_PREFIX,
  PANELITEM_PROVIDER_PREFIX,
} from './helper';

/**
 * 自定义注册
 */
export class CustomRegister {
  /**
   * 获取适配器注册key
   *
   * @author ljx
   * @date 2024-04-16 23:08:08
   * @param {string} registerType
   * @param {IRegisterParams} opts
   * @return {string}
   */
  static getRegisterKey(registerType: string, opts: IRegisterParams): string {
    switch (registerType) {
      case PANELITEM_PROVIDER_PREFIX:
        return this.calcKeyByView(opts);
      case FORMDETAIL_PROVIDER_PREFIX:
      case GRIDCOLUMN_PROVIDER_PREFIX:
      case CONTROL_PROVIDER_PREFIX:
        return this.calcKeyByCtrl(opts);
      default:
        return '';
    }
  }

  /**
   * 通过视图计算key
   * 目前适用于计算面板项的key
   * @author ljx
   * @date 2024-04-16 23:08:08
   * @param {IRegisterParams} opts
   * @return {string}
   */
  static calcKeyByView(opts: IRegisterParams): string {
    const { controlItemModel, controlModel, viewModel } = opts;
    let key = '';

    if (viewModel?.codeName) {
      key += `${viewModel.codeName.toUpperCase()}`;
    }

    if (controlModel?.codeName) {
      key += `@${controlModel.codeName.toUpperCase()}`;
    }
    // TODO 面板项模型中没有codeName暂用id
    if (controlItemModel?.id) {
      key += `@${controlItemModel.id.toUpperCase()}`;
    }
    return key;
  }

  /**
   * 通过部件计算key
   * 没有实体的部件默认为APP
   * @date 2024-04-16 23:08:08
   * @param {IRegisterParams} opts
   * @return {string}
   */
  static calcKeyByCtrl(opts: IRegisterParams): string {
    const { controlModel, controlItemModel } = opts;
    let key = '';
    let prefix: string = 'APP';
    if (controlModel) {
      const { appDataEntityId, controlType, codeName } = controlModel;
      if (appDataEntityId) {
        prefix = calcDeCodeNameById(appDataEntityId).toUpperCase();
      }
      if (controlType) {
        key += `@${controlType.toUpperCase()}`;
      }
      if (codeName) {
        key += `@${codeName.toUpperCase()}`;
      }
    }

    if (controlItemModel?.codeName) {
      key += `@${controlItemModel.codeName.toUpperCase()}`;
    }
    key = prefix + key;
    return key;
  }
}
