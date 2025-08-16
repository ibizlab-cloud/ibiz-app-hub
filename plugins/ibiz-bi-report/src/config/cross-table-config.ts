// 交叉表属性配置
export const CrossTableConfig = {
  data: {
    pagination: true,
    details: [
      {
        id: 'measure',
        caption: '指标',
        type: 'GROUP',
        isCollapse: false,
        allowClear: true,
        required: true,
        enableRemove: true,
        details: [
          {
            id: 'measure',
            caption: '指标',
            showCaption: false,
            type: 'ITEM',
            editorType: 'DRAG',
            multiple: true,
            max: 5,
            actions: [
              { id: 'UPDATE', caption: '设置显示名' },
              { id: 'REMOVE', caption: '删除' },
            ],
          },
        ],
      },
      {
        id: 'dimension',
        caption: '维度(行)',
        type: 'GROUP',
        isCollapse: false,
        allowClear: true,
        required: false,
        enableRemove: true,
        details: [
          {
            id: 'dimension',
            caption: '维度',
            showCaption: false,
            type: 'ITEM',
            editorType: 'DRAG',
            multiple: true,
            max: 5,
            actions: [
              { id: 'UPDATE', caption: '设置显示名' },
              { id: 'SORT', caption: '排序' },
              { id: 'REMOVE', caption: '删除' },
            ],
          },
        ],
      },
      {
        id: 'dimension_col',
        caption: '维度(列)',
        type: 'GROUP',
        isCollapse: false,
        allowClear: true,
        required: false,
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
        allowClear: true,
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
        id: 'gridFont',
        caption: '表格字体',
        type: 'GROUP',
        enableSwitch: false,
        details: [
          {
            id: 'gridHeader',
            caption: '表头',
            showCaption: true,
            type: 'ITEM',
            editorType: 'FONT',
            mode: 'FONT',
          },
          {
            id: 'gridHeaderAlign',
            caption: '表头对齐',
            showCaption: false,
            type: 'ITEM',
            editorType: 'POSITION',
            editorStyle: 'CENTER',
            showCenter: true,
          },
          {
            id: 'gridBody',
            caption: '表身',
            showCaption: true,
            type: 'ITEM',
            editorType: 'FONT',
            mode: 'FONT',
          },
          {
            id: 'gridBodyAlign',
            caption: '表身对齐',
            showCaption: false,
            type: 'ITEM',
            editorType: 'POSITION',
            editorStyle: 'CENTER',
            showCenter: true,
          },
        ],
      },
      {
        id: 'agg',
        caption: '合计行/列',
        type: 'GROUP',
        enableSwitch: true,
        details: [
          {
            id: 'rowPosition',
            caption: '行位置',
            showCaption: true,
            type: 'ITEM',
            editorType: 'RADIO',
            items: [
              { id: 'top', label: '顶部' },
              { id: 'bottom', label: '底部' },
            ],
          },
          {
            id: 'colPosition',
            caption: '列位置',
            showCaption: true,
            type: 'ITEM',
            editorType: 'RADIO',
            items: [
              { id: 'left', label: '左侧' },
              { id: 'right', label: '右侧' },
            ],
          },
        ],
      },
      {
        id: 'function',
        caption: '功能设置',
        type: 'GROUP',
        details: [
          {
            id: 'function',
            caption: '功能设置',
            showCaption: false,
            type: 'ITEM',
            editorType: 'CHECKBOXS',
            items: [
              { id: 'dimensionMerge', label: '同维度合并' },
              { id: 'fixedGridHeader', label: '固定表头' },
              { id: 'fixedDimension', label: '固定维度列' },
              { id: 'showPercent', label: '显示百分比' },
            ],
          },
        ],
      },
    ],
  },
};

// 交叉表原始模型
export const CrossTableModel = {
  aggMode: 'NONE',
  columnEnableFilter: 2,
  columnEnableLink: 2,
  gridStyle: 'USER',
  groupMode: 'NONE',
  pagingMode: 1,
  pagingSize: 20,
  sortMode: 'REMOTE',
  enableCustomized: false,
  enablePagingBar: false,
  singleSelect: true,
  fetchControlAction: {
    appDEMethodId: 'srfAppDEDataSetId',
    appDataEntityId: 'srfAppDataEntityId',
    id: 'fetch',
    appId: 'srfAppId',
  },
  autoLoad: true,
  showBusyIndicator: true,
  codeName: 'PIVOT_TABLE',
  controlType: 'GRID',
  logicName: '主表格',
  appDataEntityId: 'srfAppDataEntityId',
  controlParam: { id: 'grid', appId: 'srfAppId' },
  modelId: '9db1aa2be35a58b18c1974ca7cb64cc1',
  modelType: 'PSDEGRID',
  name: 'grid',
  id: 'srfAppId.srfAppDataEntityId.PIVOT_TABLE',
  appId: 'srfAppId',
};

// 交叉表默认值
export const CrossTableDefaultData = {
  caption: '',
  data: {
    // 指标
    measure: undefined,
    // 维度行
    dimension: undefined,
    // 维度列
    dimension_col: undefined,
    // 过滤
    filter: [],
    // 显示条数
    size: 50,
  },
  style: {
    // 表格字体
    gridFont: {
      show: true,
      // 标题字体
      gridHeader: {
        // 字体粗细
        fontWeight: 'normal',
        // 字体风格
        fontStyle: 'normal',
        // 字体大小
        fontSize: 14,
        // 字体颜色
        color: '#555b61',
      },
      gridHeaderAlign: 'center',
      // 标签字体
      gridBody: {
        // 字体粗细
        fontWeight: 'normal',
        // 字体风格
        fontStyle: 'normal',
        // 字体大小
        fontSize: 14,
        // 字体颜色
        color: '#1d1f23',
      },
      gridBodyAlign: 'left',
    },
    // 标签
    agg: {
      // 是否显示标签
      show: false,
      // 行位置
      rowPosition: 'top',
      // 列位置
      colPosition: 'left',
    },
    // 功能设置
    function: {
      show: true,
      function: ['dimensionMerge', 'fixedGridHeader'],
    },
  },
  extend: {},
};
