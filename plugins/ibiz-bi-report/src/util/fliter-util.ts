/* eslint-disable no-param-reassign */
import { isNilOrEmpty } from 'qx-util';
import {
  calcSearchConds,
  IFilterNode,
  ISearchCond,
  ValueOP,
} from '@ibiz-template/runtime';
import {
  IAppBIReport,
  IDatePicker,
  IDropDownList,
  IEditor,
  IPicker,
} from '@ibiz/model-core';
import { ISchemaField } from '../interface';
import { parseReportUIModel } from './chart-util';

/**
 * 不需要编辑器的操作符
 */
export const ExcludeOPs: string[] = [
  ValueOP.IS_NULL,
  ValueOP.IS_NOT_NULL,
  ValueOP.EXISTS,
  ValueOP.NOT_EXISTS,
];

/**
 * 过滤操作模式
 */
export const FilterModes = [
  { valueOP: ValueOP.EQ, label: '等于' },
  { valueOP: ValueOP.NOT_EQ, label: '不等于' },
  { valueOP: ValueOP.GT, label: '大于' },
  { valueOP: ValueOP.GT_AND_EQ, label: '大于等于' },
  { valueOP: ValueOP.LT, label: '小于' },
  { valueOP: ValueOP.LT_AND_EQ, label: '小于等于' },
  { valueOP: ValueOP.IS_NULL, label: '为空' },
  { valueOP: ValueOP.IS_NOT_NULL, label: '非空' },
  { valueOP: ValueOP.IN, label: '属于' },
  { valueOP: ValueOP.NOT_IN, label: '不属于' },
  { valueOP: ValueOP.LIKE, label: '文本包含' },
  { valueOP: ValueOP.LIFT_LIKE, label: '文本左包含' },
  { valueOP: ValueOP.RIGHT_LIKE, label: '文本右包含' },
  { valueOP: ValueOP.EXISTS, label: '存在' },
  { valueOP: ValueOP.NOT_EXISTS, label: '不存在' },
];

/**
 * 类型映射操作符
 */
export const TypeToOPs: {
  [p: string]: ValueOP[];
} = {
  string: [
    ValueOP.EQ,
    ValueOP.NOT_EQ,
    ValueOP.IS_NULL,
    ValueOP.IS_NOT_NULL,
    ValueOP.USER_LIKE,
    ValueOP.LIKE,
    ValueOP.LIFT_LIKE,
    ValueOP.RIGHT_LIKE,
  ],
  number: [
    ValueOP.EQ,
    ValueOP.GT,
    ValueOP.GT_AND_EQ,
    ValueOP.LT,
    ValueOP.LT_AND_EQ,
    ValueOP.NOT_EQ,
    ValueOP.IS_NULL,
    ValueOP.IS_NOT_NULL,
    ValueOP.IN,
    ValueOP.NOT_IN,
  ],
  date: [
    ValueOP.EQ,
    ValueOP.GT,
    ValueOP.GT_AND_EQ,
    ValueOP.LT,
    ValueOP.LT_AND_EQ,
    ValueOP.NOT_EQ,
    ValueOP.IS_NULL,
    ValueOP.IS_NOT_NULL,
    ValueOP.IN,
    ValueOP.NOT_IN,
  ],
  dropdown: [
    ValueOP.EQ,
    ValueOP.NOT_EQ,
    ValueOP.IS_NULL,
    ValueOP.IS_NOT_NULL,
    ValueOP.IN,
    ValueOP.NOT_IN,
  ],
  dataPicker: [
    ValueOP.EQ,
    ValueOP.NOT_EQ,
    ValueOP.IS_NULL,
    ValueOP.IS_NOT_NULL,
    ValueOP.IN,
    ValueOP.NOT_IN,
  ],
};

/**
 * 类型映射编辑器
 */
export const TypeToEditor: {
  [p: string]: IEditor | IDropDownList | IPicker | IDatePicker;
} = {
  string: {
    appId: '',
    editorType: 'TEXTBOX',
  },
  number: {
    appId: '',
    editorType: 'NUMBER',
  },
  date: {
    appId: '',
    editorType: 'DATEPICKEREX',
    dateTimeFormat: 'YYYY-MM-DD',
  },
  daterange: {
    appId: '',
    editorType: 'DATERANGE_SWITCHUNIT',
    dateTimeFormat: 'YYYY-MM-DD',
    editorParams: {
      defaultUnit: 'DAY',
      switchUnit: 'false',
    },
  },
  dropdown: {
    appId: '',
    valueType: 'SIMPLE',
    editorType: 'MDROPDOWNLIST',
    appCodeListId: '',
    editorParams: {
      overflowMode: 'ellipsis',
    },
  },
  dataPicker: {
    appId: '',
    editorType: 'ADDRESSPICKUP',
    appDEDataSetId: 'fetchdefault',
    objectIdField: 'srfkey',
    objectNameField: 'srfmajortext',
    valueType: 'OBJECTS',
    editorParams: {
      overflowMode: 'ellipsis',
    },
  },
};

/**
 * 获取编辑器模型
 *
 * @export
 * @param {ISchemaField} field Schema属性
 * @return {*}  {IEditor}
 */
export function getEditor(field: ISchemaField): IEditor {
  const model = { ...TypeToEditor[field.type] };
  if (field.type === 'dropdown') {
    Object.assign(model, {
      appCodeListId: field.appCodeListId,
    });
  }
  if (field.type === 'dataPicker') {
    Object.assign(model, {
      appDataEntityId: field.appDataEntityId,
    });
  }
  return model;
}

/**
 * 获取过滤条件
 *
 * @export
 * @param {string} key
 * @param {IData} data
 * @return {*}  {(ISearchCond[] | undefined)}
 */
export function getSearchconds(
  report: IAppBIReport,
): ISearchCond[] | undefined {
  let result: ISearchCond[] | undefined;
  const filter = parseReportUIModel('filter', report);
  const extend = parseReportUIModel('extend', report);
  const searchNodes: IFilterNode[] = [];
  // pql类型
  if (extend && extend.pqlValue) {
    searchNodes.push({
      nodeType: 'CUSTOM',
      customType: 'PQL',
      customCond: extend.pqlValue,
    });
  }
  // 常规类型
  if (filter && filter.length > 0) {
    const filterConds = filter
      .map((item: IData) => item.condition)
      .filter((cond: IData) => !isNilOrEmpty(cond));
    if (filterConds && filterConds.length > 0) {
      filterConds.forEach((cond: IData) => {
        // TODO 特殊处理 mpacker 条件
        if (Array.isArray(cond.value)) {
          cond.value = cond.value.map(c => c.srfkey).join(',');
        }
      });
      searchNodes.push(...filterConds);
    }
  }
  // 聚合搜索条件
  if (searchNodes.length > 0) {
    const rootNode: IFilterNode[] = [
      {
        nodeType: 'GROUP',
        logicType: 'AND',
        children: searchNodes,
      },
    ];
    result = calcSearchConds(rootNode);
  }

  return result;
}
