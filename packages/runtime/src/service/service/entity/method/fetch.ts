import {
  HttpResponse,
  ModelError,
  RuntimeModelError,
} from '@ibiz-template/core';
import { IAppDEDataSet } from '@ibiz/model-core';
import { isArray } from 'lodash-es';
import { clone, isEmpty, isNil } from 'ramda';
import { ascSort, descSort } from 'qx-util';
import { DEDQCondUtil, PSDEDQCondEngine, SearchFilter } from '../../../utils';
import { Method } from './method';
import { IDataEntity } from '../../../../interface';
import { execFieldLogics } from '../../../../de-logic';

/**
 * 数据集请求
 *
 * @author chitanda
 * @date 2022-10-10 14:10:48
 * @export
 * @class FetchMethod
 * @extends {Method}
 */
export class FetchMethod extends Method {
  declare method: IAppDEDataSet;

  async exec(
    context: IContext,
    params?: IData | IData[],
    params2?: IParams,
    header?: IData,
  ): Promise<HttpResponse<IDataEntity[]>> {
    // 若无srfappid，表示上下文已经销毁，则不执行后续逻辑直接返回
    if (!context.srfappid) {
      return new HttpResponse([]);
    }
    // 过滤参数，必须是对象
    const searchParams = params && !isArray(params) ? params : params2 || {};

    // 根据数据集合来源查询数据
    let res: HttpResponse<IData[]>;

    if (this.isLocalMode) {
      // 界面没传排序字段且当前应用实体存在预置排序字段时，则默认以预置排序字段升序排列
      const orderField = this.entity.appDEFields?.find(appDEField => {
        return appDEField.predefinedType === 'ORDERVALUE';
      });
      if (!searchParams.sort && orderField) {
        searchParams.sort = `${orderField.codeName!.toLowerCase()},ASC`;
      }
      const cond = DEDQCondUtil.getCond(this.method);
      const filter = new SearchFilter(context, searchParams);
      const items = await this.searchLocal(cond, filter);
      res = new HttpResponse<IDataEntity[]>(items, 200);
    } else {
      switch (this.method.dataSetType) {
        case 'INDEXDE':
        case 'CODELIST':
        case 'MULTIFORM':
          res = await this.fetchCodeListSet(context, searchParams);
          break;
        case 'REMOTE':
          {
            const path = this.calcPath(context);
            res = await this.request(path, context, params, params2, header);
          }
          break;
        default:
          throw new ModelError(
            this.method,
            ibiz.i18n.t('runtime.service.noSupportedDataSource', {
              dataSetType: this.method.dataSetType,
            }),
          );
      }
      // 转换实体对象
      const items: IData[] = res.data || [];
      // 格式化返回数据
      for (let i = 0; i < items.length; i++) {
        items[i] = await this.result.format(context, items[i]);
      }
      res.data = items.map(item => this.createEntity(item));
    }

    // 计算属性逻辑,每条数据走一遍
    if (res.data) {
      await execFieldLogics(
        this.entity,
        'compute',
        context,
        res.data,
        searchParams,
      );
    }

    return res as HttpResponse<IDataEntity[]>;
  }

  /**
   * 搜索本地数据
   *
   * @author chitanda
   * @date 2023-12-18 11:12:27
   * @param {(PSDEDQCondEngine | null)} cond 查询实例
   * @param {SearchFilter} filter 过滤对象
   * @param {string[]} [queryParamKeys=this.entity.quickSearchAppDEFieldIds!] 当前实体支持快速搜索的属性
   * @return {*}  {Promise<IDataEntity[]>}
   */
  async searchLocal(
    cond: PSDEDQCondEngine | null,
    filter: SearchFilter,
    queryParamKeys: string[] = this.entity.quickSearchAppDEFieldIds!,
  ): Promise<IDataEntity[]> {
    let list: IDataEntity[] = this.service.local.getList();
    // 走查询条件
    if (cond) {
      if (list.length > 0) {
        list = list.filter(obj => cond.test(obj, filter));
      }
    }
    if (list.length > 0) {
      if (filter.query && filter.query !== '') {
        if (queryParamKeys) {
          list = list.filter(obj => {
            const reg = new RegExp(filter.query.toLowerCase());
            for (let i = 0; i < queryParamKeys.length; i += 1) {
              const key = queryParamKeys[i];
              const val: string = obj[key];
              if (reg.test(val.toLowerCase())) {
                return true;
              }
            }
            return false;
          });
        }
      }
    }
    if (!isNil(filter.sortField) && !isEmpty(filter.sortField)) {
      if (filter.sortMode === 'DESC') {
        // 倒序
        list = descSort(list, filter.sortField);
      } else {
        // 正序
        list = ascSort(list, filter.sortField);
      }
    }
    if (!isNil(filter.srfDefaultCond) && !isEmpty(filter.srfDefaultCond)) {
      const defaultConds: IData = filter.srfDefaultCond;
      const defaultCondKeys: string[] = Object.keys(defaultConds);
      list = list.filter(obj => {
        for (let i = 0; i < defaultCondKeys.length; i += 1) {
          const key = defaultCondKeys[i];
          if (obj[key] === defaultConds[key]) {
            return true;
          }
        }
        return false;
      });
    }
    const { page, size } = filter;
    const start = page * size;
    const end = (page + 1) * size - 1;
    const items = list.slice(start, end).map(item => clone(item));
    return items;
  }

  /**
   * 获取代码表数据来源的集合
   * @author lxm
   * @date 2023-08-03 02:55:00
   * @param {IContext} context
   * @param {IParams} params
   * @return {*}  {Promise<HttpResponse<IData[]>>}
   */
  protected async fetchCodeListSet(
    context: IContext,
    params: IParams,
  ): Promise<HttpResponse<IData[]>> {
    const { appCodeListId } = this.method;
    if (!appCodeListId) {
      throw new RuntimeModelError(
        this.method,
        ibiz.i18n.t('runtime.service.sourceCodeTable'),
      );
    }
    const codeItems = await this.app.codeList.get(
      appCodeListId,
      context,
      params,
    );
    const { keyAppDEFieldId, majorAppDEFieldId } = this.entity;
    const dataSet = codeItems.map(item => ({
      [keyAppDEFieldId!]: item.value,
      [majorAppDEFieldId!]: item.text,
    }));

    return new HttpResponse(dataSet, 200);
  }
}
