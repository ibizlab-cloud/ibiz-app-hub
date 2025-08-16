import { IRadarData } from '../interface';

// 雷达图模型
export const RadarChartModel = {
  coordinateSystem: 'RADAR',
  chartCoordinateSystems: [
    {
      chartRadar: {
        chartCoordinateSystemId: '0',
        type: 'radar',
        name: '[radar_0]雷达坐标系[0]',
        id: '0',
        appId: 'srfAppId',
      },
      echartsType: 'radar',
      type: 'RADAR',
      name: '[radar_0]雷达坐标系[0]',
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
      echartsType: 'radar',
      chartCoordinateSystemId: '0',
      chartDataSetId: '0',
      seriesField: 'srfSeriesField',
      seriesLayoutBy: 'column',
      seriesType: 'radar',
      valueField: 'srfValue',
      enableChartDataSet: true,
      id: 'radar_0',
      appId: 'srfAppId',
    },
  ],
  dechartTitle: {
    title: 'srfCaption',
    titlePos: 'TOP',
    showTitle: true,
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
  chartRadars: [
    {
      chartCoordinateSystemId: '0',
      type: 'radar',
      name: '[radar_0]雷达坐标系[0]',
      id: '0',
      appId: 'srfAppId',
    },
  ],
  fetchControlAction: {
    appDEMethodId: 'srfAppDEDataSetId',
    appDataEntityId: 'srfAppDataEntityId',
    id: 'fetch',
    appId: 'srfAppId',
  },
  readOnly: true,
  autoLoad: true,
  showBusyIndicator: true,
  codeName: 'Radar_Chart',
  controlType: 'CHART',
  logicName: 'srfCaption',
  appDataEntityId: 'srfAppDataEntityId',
  controlParam: {
    id: 'chart',
    appId: 'srfAppId',
  },
  modelId: '0517D092-EB9B-4300-91CA-906647294254',
  modelType: 'PSDECHART',
  name: 'chart',
  id: 'srfAppId.srfAppDataEntityId.Radar_Chart',
  appId: 'srfAppId',
};
// 雷达图默认值
export const RadarDefaultData: IRadarData = {
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

// 雷达图配置
export const RadarChartConfig = {
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
            multiple: true,
            max: 3,
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
  extend: {},
};
