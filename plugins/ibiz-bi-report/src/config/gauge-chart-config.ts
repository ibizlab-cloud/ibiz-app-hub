import { IGaugeData } from '../interface';
/**
 * 仪表盘配置
 */
export const GaugeChartConfig = {
  data: {
    pagination: true,
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
        id: 'filter',
        caption: '筛选',
        type: 'GROUP',
        isCollapse: false,
        // 是否显示清空按钮
        enableRemove: true,
        // 转换编辑模式按钮
        switchEditMode: true,
        details: [
          {
            id: 'filter',
            caption: '筛选项',
            subCaption: '筛选',
            disableCalcField: true,
            showCaption: false,
            type: 'ITEM',
            editorType: 'DRAG',
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
        id: 'graphics',
        caption: '绘图',
        type: 'GROUP',
        details: [
          {
            id: 'color',
            caption: '当前配色',
            showCaption: true,
            type: 'ITEM',
            editorType: 'COLOR',
            // 'ITEM':单个颜色，'ITEMS'：颜色组
            editorStyle: 'ITEM',
          },
        ],
      },
      {
        id: 'fontSetting',
        caption: '字体设置',
        type: 'GROUP',
        show: true,
        details: [
          {
            id: 'font',
            caption: '文字',
            type: 'ITEM',
            editorType: 'FONT',
            // font | border
            mode: 'FONT',
          },
        ],
      },
      {
        id: 'featureSetting',
        caption: '功能设置',
        type: 'GROUP',
        details: [
          {
            id: 'endpoint',
            caption: '设置终点值：',
            showCaption: true,
            type: 'ITEM',
            editorType: 'ENDPOINT',
          },
        ],
      },
    ],
  },
};

/**
 * 仪表盘模型
 */
export const GaugeChartModel = {
  dechartLegend: {
    showLegend: false,
    id: 'legend',
    appId: 'srfAppId',
  },
  dechartTitle: {
    showTitle: false,
    id: 'title',
    appId: 'srfAppId',
  },
  dechartSerieses: [
    {
      caption: 'srfCaption',
      catalogField: 'srfCatalogField',
      seriesType: 'pie',
      valueField: 'srfValue',
      id: 'gauge',
      appId: 'srfAppId',
    },
  ],
  fetchControlAction: {
    appDEMethodId: 'srfAppDEDataSetId',
    appDataEntityId: 'srfAppDataEntityId',
    id: 'fetch',
    appId: 'srfAppId',
  },
  appDataEntityId: 'srfAppDataEntityId',
  id: 'srfAppId.srfAppDataEntityId.chart',
  appId: 'srfAppId',
  name: 'chart',
  readOnly: true,
  autoLoad: true,
  showBusyIndicator: true,
  codeName: 'chart',
  controlType: 'CHART',
  logicName: 'srfCaption',
};
/**
 * 仪表盘默认数据
 */
export const GaugeDefaultData: IGaugeData = {
  caption: '',
  data: {
    // 指标
    measure: undefined,
    // 筛选
    filter: undefined,
  },
  style: {
    // 绘图
    graphics: {
      // 当前配色
      colorScheme: 'default',
      // 配色列表
      color: '#6698FF',
    },
    // 字体设置
    fontSetting: {
      show: true,
      font: {
        // 字体粗细
        fontWeight: 'normal',
        // 字体风格
        fontStyle: 'normal',
        // 字体大小
        fontSize: 20,
        // 字体颜色
        color: '#000',
      },
    },
    // 功能设置
    featureSetting: {
      // 终点值
      endpoint: 100,
    },
  },
  extend: {},
};
