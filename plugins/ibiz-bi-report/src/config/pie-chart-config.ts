import { IPieData } from '../interface';

// 饼图属性配置
export const PieChartConfig = {
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
        id: 'dimension',
        caption: '维度',
        type: 'GROUP',
        isCollapse: false,
        required: true,
        enableRemove: true,
        details: [
          {
            id: 'dimension',
            caption: '维度',
            showCaption: false,
            type: 'ITEM',
            editorType: 'DRAG',
            multiple: false,
            actions: [
              { id: 'UPDATE', caption: '设置显示名' },
              { id: 'SORT', caption: '排序' },
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
        isCollapse: false,
        details: [
          {
            id: 'color',
            caption: '当前配色',
            showCaption: true,
            type: 'ITEM',
            editorType: 'COLOR',
            // 'ITEM':单个颜色，'ITEMS'：颜色组
            editorStyle: 'ITEMS',
          },
        ],
      },
      {
        id: 'label',
        caption: '标签',
        type: 'GROUP',
        enableSwitch: true,
        details: [
          {
            id: 'percentage',
            caption: '显示百分比',
            type: 'ITEM',
            editorType: 'CHECKBOX',
          },
          {
            id: 'font',
            caption: '文字',
            type: 'ITEM',
            editorType: 'FONT',
            // font | border
            mode: 'FONT',
          },
          {
            id: 'scope',
            caption: '显示数据范围',
            showCaption: true,
            type: 'ITEM',
            editorType: 'RADIO',
            items: [
              { id: 'all', label: '全部数据' },
              { id: 'max_min', label: '最大值/最小值' },
            ],
          },
        ],
      },
      {
        id: 'legend',
        caption: '图例',
        type: 'GROUP',
        enableSwitch: true,
        details: [
          {
            id: 'font',
            caption: '文字',
            showCaption: true,
            type: 'ITEM',
            editorType: 'FONT',
          },
          {
            id: 'position',
            caption: '数据位置',
            showCaption: true,
            type: 'ITEM',
            editorType: 'POSITION',
            // 'CENTER':居中显示，'DIRECTION'：方向
            editorStyle: 'DIRECTION',
            showCenter: true,
          },
        ],
      },
    ],
  },
};

// 饼图原始模型
export const PieChartModel = {
  coordinateSystem: 'NONE',
  chartCoordinateSystems: [
    {
      echartsType: 'none',
      type: 'NONE',
      name: '[pie]无坐标系[0]',
      id: '0',
      appId: 'srfAppId',
    },
  ],
  dechartDataGrid: {
    id: '0',
    appId: 'srfAppId',
  },
  dechartLegend: {
    showLegend: true,
    id: '0',
    appId: 'srfAppId',
  },
  dechartSerieses: [
    {
      caption: 'srfCaption',
      catalogField: 'srfCatalogField',
      catalogCodeListId: 'srfAppCodeListId',
      echartsType: 'pie',
      chartCoordinateSystemId: '0',
      chartDataSetId: '0',
      chartSeriesEncode: {
        category: 'srfCatalogField',
        value: 'srfValue',
        type: 'NONE',
        name: '坐标系编码',
        id: '0',
        appId: 'srfAppId',
      },
      seriesLayoutBy: 'column',
      seriesType: 'pie',
      valueField: 'srfValue',
      enableChartDataSet: true,
      id: 'pie_0',
      appId: 'srfAppId',
    },
  ],
  dechartTitle: {
    title: 'srfCaption',
    showTitle: false,
    id: '0',
    appId: 'srfAppId',
  },
  chartDataSetGroups: [
    {
      appDEDataSetId: 'srfAppDEDataSetId',
      appDataEntityId: 'srfAppDataEntityId',
      name: 'DEFAULT',
      id: '0',
      appId: 'srfAppId',
    },
  ],
  chartDataSets: [],
  fetchControlAction: {
    appDEMethodId: 'srfAppDEDataSetId',
    appDataEntityId: 'srfAppDataEntityId',
    id: 'fetch',
    appId: 'srfAppId',
  },
  readOnly: true,
  autoLoad: true,
  showBusyIndicator: true,
  codeName: 'PIE_Chart',
  controlType: 'CHART',
  logicName: 'srfCaption',
  appDataEntityId: 'srfAppDataEntityId',
  controlParam: {
    id: 'chart',
    appId: 'srfAppId',
  },
  modelId: 'B5AC8AE3-2186-497C-B6E8-BDBAE218B618',
  modelType: 'PSDECHART',
  name: 'chart',
  id: 'srfAppId.srfAppDataEntityId.PIE_Chart',
  appId: 'srfAppId',
};

// 饼图默认值
export const PieDefaultData: IPieData = {
  caption: '',
  data: {
    // 指标
    measure: undefined,
    // 维度
    dimension: undefined,
    // 过滤
    filter: undefined,
  },
  style: {
    // 绘图
    graphics: {
      // 当前配色
      colorScheme: 'default',
      // 配色列表
      color: [],
    },
    // 标签
    label: {
      // 是否显示标签
      show: false,
      // 是否显示百分比
      percentage: false,
      // 标签字体
      font: {
        // 字体粗细
        fontWeight: 'normal',
        // 字体风格
        fontStyle: 'normal',
        // 字体大小
        fontSize: 14,
        // 字体颜色
        color: '#000',
      },
      // 显示数据范围
      scope: 'all',
    },
    // 图例
    legend: {
      // 是否显示图例
      show: true,
      // 图例字体
      font: {
        // 字体粗细
        fontWeight: 'normal',
        // 字体风格
        fontStyle: 'normal',
        // 字体大小
        fontSize: 14,
        // 字体颜色
        color: '#000',
      },
      // 图例位置
      position: 'left-top',
    },
  },
  extend: {},
};
