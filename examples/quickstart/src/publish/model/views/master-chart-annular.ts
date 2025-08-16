export default {
  enableSearch: true,
  loadDefault: true,
  deviewCodeName: 'Chart_annular',
  deviewId: '544463f120088545ef60e215720825b2',
  accUserMode: 3,
  capLanguageRes: {
    lanResTag: 'DE.LNAME.MASTER',
  },
  caption: '图表_环形图',
  codeName: 'master_chart_annular',
  appDataEntityId: 'web.master',
  appViewEngines: [
    {
      engineCat: 'VIEW',
      engineType: 'ChartView',
      id: 'engine',
    },
  ],
  appViewMsgGroupId: 'chart_annular',
  controls: [
    {
      searchButtonStyle: 'DEFAULT',
      deformPages: [
        {
          layout: {
            columnCount: 24,
            layout: 'TABLE_24COL',
          },
          caption: '常规条件',
          codeName: 'formpage1',
          detailStyle: 'DEFAULT',
          detailType: 'FORMPAGE',
          id: 'formpage1',
        },
      ],
      layout: {
        columnCount: 24,
        layout: 'TABLE_24COL',
      },
      tabHeaderPos: 'TOP',
      noTabHeader: true,
      autoLoad: true,
      showBusyIndicator: true,
      codeName: 'master_chart_annular_search_form',
      controlType: 'SEARCHFORM',
      logicName: '图表_环形图_搜索表单',
      appDataEntityId: 'web.master',
      controlParam: {
        id: 'searchform',
      },
      modelId: 'bbf421e09e02bc5244dc03ad1f8252e7',
      modelType: 'PSDEFORM_SEARCHFORM',
      name: 'searchform',
      id: 'web.master.master_chart_annular_search_form',
    },
    {
      coordinateSystem: 'NONE',
      chartCoordinateSystems: [
        {
          echartsType: 'none',
          type: 'NONE',
          name: '[pie_0]无坐标系[0]',
          id: '0',
        },
      ],
      dechartDataGrid: {
        id: '0',
      },
      dechartLegend: {
        legendPos: 'BOTTOM',
        showLegend: true,
        id: '0',
      },
      dechartSerieses: [
        {
          caption: '访问来源',
          catalogField: 'TYPE',
          echartsType: 'pie',
          chartCoordinateSystemId: '0',
          chartDataSetId: '0',
          chartSeriesEncode: {
            category: 'TYPE',
            value: 'QUANTITY',
            type: 'NONE',
            name: '坐标系编码',
            id: '0',
          },
          seriesLayoutBy: 'column',
          seriesType: 'pie',
          valueField: 'QUANTITY',
          enableChartDataSet: true,
          userParam: {
            'EC.itemStyle':
              '{"borderColor":"#E80A0A","borderWidth":0,"borderRadius":10}',
            'EC.radius': '["40%","60%"]',
          },
          id: 'pie_0',
        },
      ],
      dechartTitle: {
        title: '环形图',
        showTitle: true,
        id: '0',
      },
      chartDataSetGroups: [
        {
          appDEDataSetId: 'fetch_default',
          appDataEntityId: 'web.master',
          name: 'DEFAULT',
          id: '0',
        },
      ],
      chartDataSets: [
        {
          chartDataSetFields: [
            {
              groupField: true,
              name: 'TYPE',
              id: '0',
            },
            {
              index: 1,
              name: 'QUANTITY',
              id: '1',
            },
          ],
          name: 'pie_0-DEFAULT',
          id: '0',
        },
      ],
      navViewPos: 'NONE',
      fetchControlAction: {
        appDEMethodId: 'fetch_default',
        appDataEntityId: 'web.master',
        id: 'fetch',
      },
      readOnly: true,
      autoLoad: true,
      showBusyIndicator: true,
      codeName: 'master_chart_annular_chart',
      controlType: 'CHART',
      height: 300,
      logicName: 'Chart4',
      appDataEntityId: 'web.master',
      controlParam: {
        id: 'chart',
      },
      modelId: '7c1245be58eb28bf378791684f62c4fc',
      modelType: 'PSDECHART',
      userParam: {
        'EC.emphasis':
          '{"show":true,"itemStyle":{"opacity":0.8,"borderWidth":6,"borderColor":""},"focus":"self","scale":true,"shadowBlur":10,"shadowOffsetX":0,"shadowColor":"rgba(0,0,0,0.5)"}',
        'EC.title':
          '{"text":"","left":"center","top":"center","textStyle":{"fontSize":"18px"}}',
        'EC.legend':
          '{"left":"center","bottom":0,"orient":"horizontal","icon":"circle","type":"plain"}',
        'EC.color':
          '["#5470c6","#91cc75","#fac858","#ee6666","#73c0de","#3ba272","#fc8452","#9a60b4","#ea7ccc","#5470c6","#91cc75"]',
      },
      name: 'chart',
      id: 'web.master.master_chart_annular_chart',
    },
    {
      capLanguageRes: {
        lanResTag: 'DE.LNAME.MASTER',
      },
      caption: '图表_环形图',
      codeName: 'chart_annular_captionbar',
      controlType: 'CAPTIONBAR',
      appDataEntityId: 'web.master',
      controlParam: {},
      name: 'captionbar',
      id: 'chart_annular_captionbar',
    },
  ],
  viewLayoutPanel: {
    layoutBodyOnly: true,
    useDefaultLayout: true,
    layoutPanel: true,
    codeName: 'layoutpanel',
    controlStyle: 'APPDECHARTVIEW',
    controlType: 'VIEWLAYOUTPANEL',
    appDataEntityId: 'web.master',
    controlParam: {},
    id: 'layoutpanel',
  },
  title: '图表_环形图',
  viewStyle: 'DEFAULT',
  viewType: 'DECHARTVIEW',
  enableDP: true,
  showCaptionBar: false,
  modelId: 'a94b30589a65489bd2e2da0f6db6e201',
  modelType: 'PSAPPDEVIEW',
  name: 'MASTERChart_annular',
  id: 'web.master_chart_annular',
};
