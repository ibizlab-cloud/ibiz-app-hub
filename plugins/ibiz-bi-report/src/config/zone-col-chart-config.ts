import { IZoneColData } from '../interface';

// 分区柱状图配置
export const ZoneColChartConfig = {
  data: {
    details: [
      {
        id: 'measure',
        caption: '指标/纵轴',
        type: 'GROUP',
        isCollapse: false,
        required: true,
        // 是否显示清空按钮
        enableRemove: true,
        details: [
          {
            id: 'measure',
            caption: '指标/纵轴',
            showCaption: false,
            type: 'ITEM',
            editorType: 'DRAG',
            multiple: true,
            max: 3,
            actions: [
              { id: 'UPDATE', caption: '设置显示名' },
              { id: 'CORDON', caption: '设置警戒线' },
              { id: 'REMOVE', caption: '删除' },
            ],
          },
        ],
      },
      {
        id: 'dimension',
        caption: '维度/横轴',
        type: 'GROUP',
        isCollapse: false,
        required: true,
        enableRemove: true,
        details: [
          {
            id: 'dimension',
            caption: '维度/横轴',
            showCaption: false,
            type: 'ITEM',
            editorType: 'DRAG',
            multiple: true,
            max: 3,
            actions: [
              { id: 'UPDATE', caption: '设置显示名' },
              { id: 'SORT', caption: '排序' },
              { id: 'REMOVE', caption: '删除' },
            ],
          },
        ],
      },
      {
        id: 'group',
        caption: '分组',
        type: 'GROUP',
        isCollapse: false,
        details: [
          {
            id: 'group',
            caption: '分组',
            showCaption: false,
            type: 'ITEM',
            editorType: 'DRAG',
            multiple: false,
            typeLimit: {
              tag: 'NOTIN',
              types: ['DATE'],
            },
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
        id: 'xAxis',
        caption: '横轴',
        type: 'GROUP',
        enableSwitch: false,
        details: [
          {
            id: 'showTitle',
            caption: '显示轴标题',
            type: 'ITEM',
            editorType: 'CHECKBOX',
          },
          {
            id: 'titleFont',
            caption: '轴标题',
            type: 'ITEM',
            editorType: 'FONT',
            mode: 'FONT',
          },
          {
            id: 'showLabel',
            caption: '显示轴标签',
            type: 'ITEM',
            editorType: 'CHECKBOX',
          },
          {
            id: 'labelFont',
            caption: '轴标签',
            type: 'ITEM',
            editorType: 'FONT',
            mode: 'FONT',
          },
          {
            id: 'showAxisline',
            caption: '显示轴线',
            type: 'ITEM',
            editorType: 'CHECKBOX',
          },
          {
            id: 'axisline',
            caption: '显示轴线',
            type: 'ITEM',
            editorType: 'FONT',
            mode: 'BORDER',
          },
          {
            id: 'showGridline',
            caption: '显示网格线',
            type: 'ITEM',
            editorType: 'CHECKBOX',
          },
          {
            id: 'gridline',
            caption: '显示网格线',
            type: 'ITEM',
            editorType: 'FONT',
            mode: 'BORDER',
          },
          {
            id: 'enableLabelInterval',
            caption: '开启轴标签间隔',
            type: 'ITEM',
            editorType: 'CHECKBOX',
          },
          {
            id: 'labelInterval',
            caption: '标签间隔',
            showCaption: true,
            type: 'ITEM',
            editorType: 'NUMBER',
          },
        ],
      },
      {
        id: 'yAxis',
        caption: '纵轴',
        type: 'GROUP',
        enableSwitch: false,
        details: [
          {
            id: 'showTitle',
            caption: '显示轴标题',
            type: 'ITEM',
            editorType: 'CHECKBOX',
          },
          {
            id: 'titleFont',
            caption: '显示轴标题',
            type: 'ITEM',
            editorType: 'FONT',
            mode: 'FONT',
          },
          {
            id: 'showLabel',
            caption: '显示轴标签',
            type: 'ITEM',
            editorType: 'CHECKBOX',
          },
          {
            id: 'labelFont',
            caption: '显示轴标签',
            type: 'ITEM',
            editorType: 'FONT',
            mode: 'FONT',
          },
          {
            id: 'showAxisline',
            caption: '显示轴线',
            type: 'ITEM',
            editorType: 'CHECKBOX',
          },
          {
            id: 'axisline',
            caption: '显示轴线',
            type: 'ITEM',
            editorType: 'FONT',
            mode: 'BORDER',
          },
          {
            id: 'showGridline',
            caption: '显示网格线',
            type: 'ITEM',
            editorType: 'CHECKBOX',
          },
          {
            id: 'gridline',
            caption: '显示网格线',
            type: 'ITEM',
            editorType: 'FONT',
            mode: 'BORDER',
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
            mode: 'FONT',
          },
          {
            id: 'position',
            caption: '标签位置',
            type: 'ITEM',
            editorType: 'RADIO',
            items: [
              { id: 'top', label: '置顶' },
              { id: 'inside', label: '居中' },
            ],
          },
          {
            id: 'scope',
            caption: '显示数据',
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
            mode: 'FONT',
          },
          {
            id: 'position',
            caption: '数据位置',
            showCaption: true,
            type: 'ITEM',
            editorType: 'POSITION',
            // 'CENTER':居中显示，'DIRECTION'：方向
            editorStyle: 'DIRECTION',
          },
        ],
      },
    ],
  },
};
// 分区柱状图默认值
export const ZoneColDefaultData: IZoneColData = {
  caption: '',
  data: {
    // 指标
    measure: undefined,
    // 维度
    dimension: undefined,
    // 分组
    group: undefined,
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
    // 横轴
    xAxis: {
      show: true,
      showTitle: true,
      // 标题字体
      titleFont: {
        // 字体粗细
        fontWeight: 'normal',
        // 字体风格
        fontStyle: 'normal',
        // 字体大小
        fontSize: 12,
        // 字体颜色
        color: '#000',
      },
      showLabel: true,
      // 标签字体
      labelFont: {
        // 字体粗细
        fontWeight: 'normal',
        // 字体风格
        fontStyle: 'normal',
        // 字体大小
        fontSize: 12,
        // 字体颜色
        color: '#000',
      },
      showAxisline: true,
      // 轴线粗细
      axisline: {
        // border风格
        borderStyle: 'solid',
        // 轴线粗细
        borderSize: 1,
        // 字体颜色
        color: '#000',
      },
      showGridline: false,
      // 网格线样式
      gridline: {
        // border风格
        borderStyle: 'solid',
        // 轴线粗细
        borderSize: 1,
        // 字体颜色
        color: '#000',
      },
      // 启用标签间隔控制
      enableLabelInterval: false,
      // 标签间隔
      labelInterval: 1,
    },
    // 纵轴
    yAxis: {
      show: true,
      showTitle: true,
      // 轴标题字体
      titleFont: {
        // 字体粗细
        fontWeight: 'normal',
        // 字体风格
        fontStyle: 'normal',
        // 字体大小
        fontSize: 12,
        // 字体颜色
        color: '#000',
      },
      showLabel: true,
      // 轴标签字体
      labelFont: {
        // 字体粗细
        fontWeight: 'normal',
        // 字体风格
        fontStyle: 'normal',
        // 字体大小
        fontSize: 12,
        // 字体颜色
        color: '#000',
      },
      showAxisline: true,
      // 轴线
      axisline: {
        // border风格
        borderStyle: 'dashed',
        // 轴线粗细
        borderSize: 1,
        // 字体颜色
        color: '#dddddd',
      },
      showGridline: true,
      // 网格线
      gridline: {
        // border风格
        borderStyle: 'dashed',
        // 轴线粗细
        borderSize: 1,
        // 字体颜色
        color: '#dddddd',
      },
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
        fontSize: 12,
        // 字体颜色
        color: '#000',
      },
      position: 'top',
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
        fontSize: 12,
        // 字体颜色
        color: '#000',
      },
      // 图例位置
      position: 'right-top',
    },
  },
  extend: {},
};
// 分区柱状图模型
export const ZoneColChartModel = {
  coordinateSystem: 'XY',
  chartCoordinateSystems: [
    {
      chartGrid: {
        chartGridXAxis0Id: '0',
        chartGridYAxis0Id: '0',
        chartCoordinateSystemId: '0',
        type: 'grid',
        name: '[bar_1]直角坐标系[0]',
        id: '0',
        appId: 'srfAppId',
      },
      echartsType: 'cartesian2d',
      type: 'XY',
      name: '[bar_1]直角坐标系[0]',
      id: '0',
      appId: 'srfAppId',
    },
  ],
  dechartDataGrid: {
    showDataGrid: false,
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
      echartsType: 'bar',
      chartCoordinateSystemId: '0',
      chartDataSetId: '0',
      chartSeriesEncode: {
        chartXAxisId: '0',
        chartYAxisId: '0',
        x: ['srfCatalogField'],
        y: ['srfValue'],
        type: 'XY',
        name: '坐标系编码',
        id: '0',
        appId: 'srfAppId',
      },
      seriesLayoutBy: 'column',
      seriesType: 'bar',
      valueField: 'srfValue',
      enableChartDataSet: true,
      id: 'bar_1',
      appId: 'srfAppId',
    },
  ],
  dechartTitle: {
    title: '柱状图',
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
  chartGrids: [
    {
      chartGridXAxis0Id: '0',
      chartGridYAxis0Id: '0',
      chartCoordinateSystemId: '0',
      type: 'grid',
      name: '[bar_1]直角坐标系[0]',
      id: '0',
      appId: 'srfAppId',
    },
  ],
  chartXAxises: [
    {
      echartsPos: 'xAxis',
      echartsType: 'category',
      position: 'bottom',
      type: 'category',
      name: 'axis_xAxis_0',
      id: '0',
      appId: 'srfAppId',
    },
  ],
  chartYAxises: [
    {
      echartsPos: 'yAxis',
      echartsType: 'value',
      position: 'left',
      type: 'numeric',
      name: 'axis_yAxis_0',
      id: '0',
      appId: 'srfAppId',
    },
  ],
  fetchControlAction: {
    appDEMethodId: 'fetchdefault',
    appDataEntityId: 'srfAppDataEntityId',
    id: 'fetch',
    appId: 'srfAppId',
  },
  readOnly: true,
  autoLoad: true,
  showBusyIndicator: true,
  codeName: 'STACKCOL_Chart',
  controlType: 'CHART',
  logicName: 'srfCaption',
  appDataEntityId: 'srfAppDataEntityId',
  controlParam: {
    id: 'chart',
    appId: 'srfAppId',
  },
  modelId: 'A1BCD468-3027-4DAF-A36E-F8900BF586DA',
  modelType: 'PSDECHART',
  name: 'chart',
  id: 'srfAppId.srfAppDataEntityId.STACKCOL_Chart',
  appId: 'srfAppId',
};
