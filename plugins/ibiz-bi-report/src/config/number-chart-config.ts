import { INumberData } from '../interface';

// 数字图表配置
export const NumberChartConfig = {
  data: {
    details: [
      {
        id: 'measure',
        caption: '指标',
        type: 'GROUP',
        isCollapse: false,
        required: true,
        // 是否显示清空按钮
        enableRemove: true,
        details: [
          {
            id: 'measure',
            caption: '指标',
            showCaption: false,
            type: 'ITEM',
            editorType: 'DRAG',
            multiple: false,
            actions: [
              { id: 'UPDATE', caption: '设置显示名' },
              { id: 'REMOVE', caption: '删除' },
            ],
          },
        ],
      },
      {
        id: 'period',
        caption: '同环比',
        type: 'GROUP',
        isCollapse: false,
        details: [
          {
            id: 'period',
            caption: '时间维度',
            subCaption: '同环比',
            showCaption: false,
            type: 'ITEM',
            editorType: 'DRAG',
            multiple: false,
            disableCalcField: false,
            typeLimit: {
              tag: 'IN',
              types: ['DATE'],
            },
            actions: [
              { id: 'CONFIG', caption: '配置' },
              { id: 'UPDATE', caption: '设置显示名' },
              { id: 'REMOVE', caption: '删除' },
            ],
          },
        ],
      },
      {
        id: 'filter',
        caption: '筛选',
        type: 'GROUP',
        isCollapse: false,
        enableRemove: true,
        // 转换编辑模式按钮
        switchEditMode: true,
        details: [
          {
            id: 'filter',
            caption: '筛选项',
            subCaption: '筛选',
            showCaption: false,
            type: 'ITEM',
            editorType: 'DRAG',
            disableCalcField: true,
            multiple: true,
            actions: [
              { id: 'FILTER', caption: '过滤' },
              { id: 'REMOVE', caption: '删除' },
            ],
            expandActions: [{ id: 'FILTER', caption: '过滤' }],
          },
        ],
      },
    ],
  },
  style: {
    details: [
      {
        id: 'font',
        caption: '字体设置',
        type: 'GROUP',
        details: [
          {
            id: 'font',
            caption: '文字',
            type: 'ITEM',
            editorType: 'FONT',
            // font | border
            mode: 'FONT',
            fontMax: 300,
          },
        ],
      },
      {
        id: 'yoy',
        caption: '同比',
        type: 'GROUP',
        enableSwitch: true,
        details: [
          {
            id: 'yoy',
            caption: '同比',
            showCaption: false,
            type: 'ITEM',
            editorType: 'CHECKBOXS',
            items: [
              { id: 'orgin', label: '显示原始值' },
              { id: 'difference', label: '显示差异值' },
            ],
          },
        ],
      },
      {
        id: 'qoq',
        caption: '环比',
        type: 'GROUP',
        enableSwitch: true,
        details: [
          {
            id: 'qoq',
            caption: '环比',
            showCaption: false,
            type: 'ITEM',
            editorType: 'CHECKBOXS',
            items: [
              { id: 'orgin', label: '显示原始值' },
              { id: 'difference', label: '显示差异值' },
            ],
          },
        ],
      },
    ],
  },
};
// 数字图表默认值
export const NumberDefaultData: INumberData = {
  caption: '',
  data: {
    // 指标
    measure: undefined,
    // 维度
    period: undefined,
    // 过滤
    filter: undefined,
  },
  style: {
    font: {
      show: true,
      font: {
        // 字体粗细
        fontWeight: 'normal',
        // 字体风格
        fontStyle: 'normal',
        // 字体大小
        fontSize: 100,
        // 字体颜色
        color: '#000',
      },
    },
    // 同比
    yoy: {
      show: false,
      yoy: ['orgin', 'difference'],
    },
    // 环比
    qoq: {
      show: false,
      qoq: ['orgin', 'difference'],
    },
  },
  extend: {},
};
