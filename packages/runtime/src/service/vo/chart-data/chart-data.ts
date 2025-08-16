/* eslint-disable no-constructor-return */
import { createUUID } from 'qx-util';
import { IDEChartSeries } from '@ibiz/model-core';
import { IChartData } from '../../../interface';

// 更新属性，缺的补充定义
function updateKeyDefine(target: IParams, keys: string[]): void {
  keys.forEach(key => {
    if (!Object.prototype.hasOwnProperty.call(target, key)) {
      Object.defineProperty(target, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: undefined,
      });
    }
  });
}

export class ChartData implements IChartData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string | symbol]: any;

  _seriesModelId?: string;

  _catalog?: string;

  _groupName?: string;

  _uuid?: string;

  _chartid?: string;

  _catalogLevelData?: IData[];

  constructor(
    deData: IData,
    seriesModel?: IDEChartSeries,
    catalog?: string,
    groupName?: string,
    chartId?: string,
    catalogLevelData?: IData[],
  ) {
    this._seriesModelId = seriesModel?.id;

    this._catalog = catalog;

    this._groupName = groupName;

    this._uuid = createUUID();

    this._chartid = chartId;

    this._catalogLevelData = catalogLevelData;

    return new Proxy<ChartData>(this, {
      set(target, p, value): boolean {
        if (Object.prototype.hasOwnProperty.call(deData, p)) {
          deData[p] = value;
        } else {
          target[p] = value;
        }
        return true;
      },

      get(target, p, _receiver): unknown {
        if (target[p] !== undefined) {
          return target[p];
        }
        if (deData[p] !== undefined) {
          return deData[p];
        }
      },

      ownKeys(target): ArrayLike<string | symbol> {
        // 整合所有并排除重复
        const allKeys = [
          ...new Set([...Object.keys(target), ...Object.keys(deData)]),
        ];
        updateKeyDefine(target, allKeys);
        return allKeys;
      },
    });
  }
}
