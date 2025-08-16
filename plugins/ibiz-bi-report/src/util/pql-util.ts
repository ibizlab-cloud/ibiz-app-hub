/* eslint-disable no-plusplus */
/* eslint-disable no-continue */
/* eslint-disable no-useless-escape */
import { RuntimeError } from '@ibiz-template/core';
import { ValueOP } from '@ibiz-template/runtime';
import { IPqlItem } from '../interface';
import { ExcludeOPs } from './fliter-util';

// 过滤操作模式
const FilterModes = [
  { valueOP: ValueOP.EQ, label: '等于', sqlOP: '=' },
  { valueOP: ValueOP.NOT_EQ, label: '不等于', sqlOP: '<>' },
  { valueOP: ValueOP.GT, label: '大于', sqlOP: '>' },
  { valueOP: ValueOP.GT_AND_EQ, label: '大于等于', sqlOP: '>=' },
  { valueOP: ValueOP.LT, label: '小于', sqlOP: '<' },
  { valueOP: ValueOP.LT_AND_EQ, label: '小于等于', sqlOP: '<=' },
  { valueOP: ValueOP.IS_NULL, label: '为空', sqlOP: 'IS NULL' },
  { valueOP: ValueOP.IS_NOT_NULL, label: '非空', sqlOP: 'IS NOT NULL' },
  { valueOP: ValueOP.IN, label: '属于', sqlOP: 'IN' },
  { valueOP: ValueOP.NOT_IN, label: '不属于', sqlOP: 'NOT IN' },
  { valueOP: ValueOP.LIKE, label: '文本包含', sqlOP: 'LIKE' },
  // { valueOP: ValueOP.EXISTS, label: '存在', sqlOP: 'EXISTS' },
  // { valueOP: ValueOP.NOT_EXISTS, label: '不存在', sqlOP: 'NOT EXISTS' },
];

// 过滤操作模式映射
const filterModeMap = new Map();
FilterModes.forEach(mode => {
  filterModeMap.set(mode.valueOP, mode);
});
// 过滤操作符号映射
const symbolMap = new Map();
FilterModes.forEach(mode => {
  symbolMap.set(mode.sqlOP, mode.valueOP);
});

// 解析自定义条件
export const parseCustomCond = (cond: string): IData[] | undefined => {
  try {
    const items = cond.split(`  `);
    const pqlItems: IPqlItem[] = [];
    for (let i = 0; i < items.length; i++) {
      if (i !== 0) {
        const connection = items[i];
        if (connection === 'and' || connection === 'or') {
          if (i === items.length - 1) {
            throw new RuntimeError('pql自定义条件解析错误');
          }
          pqlItems.push({
            type: 'connection',
            value: {
              label: connection,
              value: connection,
            },
          });
        } else {
          throw new RuntimeError('pql自定义条件解析错误');
        }
      }
      const key = items[i !== 0 ? ++i : i];
      const operator = items[++i];

      if (key && /^\$/.test(key) && operator) {
        const keyObj: IData = JSON.parse(key.slice(1));
        if (ExcludeOPs.includes(symbolMap.get(operator))) {
          pqlItems.push({
            type: 'condition',
            key: {
              label: keyObj.caption,
              value: keyObj.name,
            },
            operator: {
              label: filterModeMap.get(symbolMap.get(operator))?.label || '',
              value: symbolMap.get(operator),
            },
          });
          continue;
        } else {
          const value = items[++i];
          if (value) {
            const valueObj: IData = /^\$/.test(value)
              ? JSON.parse(value.slice(1))
              : { caption: value, value };
            pqlItems.push({
              type: 'condition',
              key: {
                label: keyObj.caption,
                value: keyObj.name,
              },
              operator: {
                label: filterModeMap.get(symbolMap.get(operator))?.label || '',
                value: symbolMap.get(operator),
              },
              value: {
                type: /^\$/.test(value) ? 'pql-field-value' : undefined,
                label: valueObj.caption,
                value: valueObj.value,
              },
            });
            continue;
          }
        }
      }
      throw new RuntimeError('pql自定义条件解析错误');
    }
    return pqlItems;
  } catch (err) {
    ibiz.log.error((err as IData)?.message);
  }
};
