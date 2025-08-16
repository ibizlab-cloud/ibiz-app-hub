import { zhCn as runTimeZhCN } from '@ibiz-template/runtime';
import { zhCn as vue3UtilZhCN } from '@ibiz-template/vue3-util';
import { zhCn as modelHelperZhCN } from '@ibiz-template/model-helper';
import { zhCn as coreZhCN } from '@ibiz-template/core';

export default {
  // 应用级
  app: {
    noSupport: '暂未支持',
    add: '添加',
    delete: '删除',
    retract: '收起',
    close: '关闭',
    search: '搜索',
  },
  // 组件
  component: {
    actionToolbar: {
      noSupportDropDown: '下拉模式暂不支持',
    },
    rawItem: {
      errorConfig: '{type} 类型自定义参数配置错误',
      noSupportVideo: '你的浏览器不支持video标签',
    },
    emojiSelect: {
      frequently: '常用',
      peoples: '情绪',
      nature: '自然',
      foods: '食物与饮料',
      activity: '活动',
      objects: '对象',
      places: '旅行与地方',
      symbols: '符号',
      flags: '旗帜',
    },
    mdCtrlSetting: {
      confirm: '确定',
      sort: '排序',
      asc: '升序',
      desc: '降序',
    },
    dateRangePicker: {
      headerPlaceholder: '请选择日期范围',
      confirm: '确认',
      today: '今天',
      startDate: '开始时间',
      endDate: '结束时间',
      scopeIsInvalid: '范围无效。',
      overLimit: '不在允许的范围内',
      year: '年',
      month: '月',
      day: '日',
      formatIsInvalid: '格式无效',
      use: '使用',
      example: '示例',
      selectDate: '请选择日期',
      noSelect: '暂无选中',
    },
    formItemContainer: {
      more: '更多',
    },
  },
  // 部件
  control: {
    common: {
      loadMore: '加载更多',
    },
    dataView: { end: '我已经到底啦~' },
    appmenu: {
      more: '更多',
      bottomNav: '底部导航',
      customNav: '自定义导航',
      save: '保存',
    },
    form: {
      noSupportDetailType:
        '暂未支持的表单项类型: {detailType} 或找不到对应适配器',
      formGroupPanel: {
        showMore: '显示更多',
      },
      formMDctrlForm: {
        noFindProvider: '未找到表单的适配器',
      },
      repeaterMultiForm: {
        confirmTitle: '删除提醒',
        confirmDesc: '是否删除选中项?',
      },
      repeaterSingleForm: {
        errorMessage: '没有repeatedForm',
      },
      formMDctrlRepeater: {
        noSupportStyle: '暂未支持重复器样式{repeaterStyle}',
      },
      mdCtrlContainer: {
        noSlot: '未提供item插槽',
      },
      formMDctrl: {
        errorMessage: '暂未支持内容类型为{contentType}',
      },
      searchForm: {
        search: '查询',
        reset: '重置',
      },
    },
    list: {
      expand: '展开',
      selectedData: '选中数据',
      end: '我已经到底啦~',
    },
    searchBar: {
      confirm: '确认',
      reset: '重置',
      filter: '筛选',
      add: '添加',
      remove: '删除',
      addCond: '添加筛选条件',
      value: '值',
      when: '当',
      operate: '操作',
      property: '属性',
      and: '且',
      or: '或',
    },
    toolbar: {
      noSupportType: '工具栏项类型：{itemType}暂不支持',
    },
    tree: {
      subordinate: '下级',
    },
    wizardPanel: {
      prev: '上一步',
      next: '下一步',
      finish: '完成',
    },
    calendar: {
      today: '今天',
      pickerDate: '选择日期',
      customPicker: '请选择日期',
    },
  },
  // 编辑器
  editor: {
    common: {
      entityConfigErr: '请配置实体和实体数据集',
      selectViewConfigErr: '请配置数据选择视图',
      linkViewConfigErr: '请配置数据链接视图',
      cancel: '取消',
      confirm: '确定',
    },
    html: {
      expand: '展开',
      collapse: '收起',
    },
    cascader: {
      ibizCascader: {
        title: '标题{index}',
      },
    },
    datePicker: {
      title: '选择日期',
      cancel: '取消',
      confirm: '确认',
      year: '年',
      month: '月',
      day: '日',
      hour: '时',
      min: '分',
      sec: '秒',
      clear: '清除',
    },
    dropdownList: {
      noSupportTreePicker: '暂未支持树形下拉选择',
      confirm: '确定',
    },
    markdown: {
      uploadJsonFormatErr: '配置uploadparams没有按标准JSON格式',
      exportJsonFormatErr: '配置exportparams没有按标准JSON格式',
      downloadFailedErr: '下载文件失败',
      noExistentErr: '文件流数据不存在',
    },
    notSupportedEditor: {
      unsupportedType: '未支持的编辑器类型 - {type}',
    },
    stepper: {
      pleaseEnter: '请输入',
    },
    upload: {
      uploadJsonFormatErr: '配置uploadparams没有按标准JSON格式',
      exportJsonFormatErr: '配置exportparams没有按标准JSON格式',
      cancelUpload: '取消上传',
    },
    emojiPicker: {
      addEmoji: '添加表情',
    },
    dropdown: {
      pleaseSelect: '请选择',
      clear: '清除',
      searchPlaceholder: '搜索',
    },
    dateRangePicker: {
      selectRange: '请选择日期范围',
    },
  },
  // 多语言
  locale: {
    prompt: '提示',
    switchLanguagePrompt: '切换语言需要刷新页面，确认切换?',
  },
  mobApp: {
    unauthorizedHandler: {
      noFoundEnvParams: '找不到环境参数casLoginUrl',
      prohibitAccessPrompt: '当前账户被禁止访问',
      exitPrompt: '是否要退出当前账户？',
    },
  },
  // 面板组件
  panelComponent: {
    authUserinfo: {
      visitor: '游客',
    },
    authSsO: {
      noSupported: '暂不支持{type}登录',
      dingLogin: '钉钉登录',
      wechatLogin: '微信登录',
    },
    navPosIndex: {
      noSupportPrompt: '非路由模式导航占位暂未支持',
    },
    panelVideoPlayer: {
      noSupportPrompt: '您的设备不支持video标签',
    },
    wfStepTrace: {
      processingComplete: '处理完成时间',
      processingSteps: '处理环节',
      processingPersonnel: '处理人',
      submissionPath: '提交路径',
    },
    userMessage: {
      notice: '通知',
      backendTasks: '后台作业',
      allRead: '全部已读',
      all: '全部',
      unread: '未读',
      asyncActionPreview: {
        downloadFailedErr: '下载文件失败',
        noExistentErr: '文件流数据不存在',
        importDetailPrompt: '导入数据详情-{name}',
        parseImportInfoErr: '解析导入信息异常',
        downloadErrFile: '下载错误文件',
        importTime: '导入时间: ',
        importTotal: '导入总条数: ',
        successImport: '成功导入数: ',
        ImportFailed: '导入失败数: ',
      },
      asyncActionTab: {
        noSupportType: '异步操作类型{type}暂未支持',
        noAsyncAction: '暂无异步操作',
      },
      internalMessageContainer: {
        markAsRead: '标记为已读',
      },
      internalMessageJson: {
        jumpToView: '跳转到视图',
        missingHtml: '数据的content里缺少html',
      },
      internalMessageTab: {
        noSupportType: '站内消息类型{type}暂未支持',
        notificationYet: '暂无通知',
        loadMore: '加载更多({length})',
        onlyShowUnread: '只显示未读',
      },
    },
  },
  // 工具
  util: {
    loading: '加载中',
    notAchieved: '没有实现',
    unrealized: '未实现',
    cacheWarningPrompt: '堆栈只有一个缓存不能后退了',
    scanQrcode: {
      notAllowedError: '您需要授予相机访问权限',
      notFoundError: '此设备上没有摄像头',
      notSupportedError: '需要安全上下文（HTTPS，localhost）',
      notReadableError: '相机是否已在使用中？',
      overconstrainedError: '安装的摄像头不合适',
      streamApiNotSupportedError: '此浏览器不支持流API',
      insecureContextError:
        '只有在安全的情况下才允许访问摄像头。使用HTTPS或localhost而不是HTTP。',
    },
  },
  // 视图
  view: {
    fillInUserName: '请填写用户名',
    fillInPassword: '请填写密码',
    loginFailed: '登录失败',
    enterUserName: '请输入用户名',
    enterPassword: '请输入密码',
    userName: '用户名',
    password: '密码',
    login: '登录',
    thirdAuthFail: '第三方授权登录失败',
  },
  // 视图引擎
  viewEngine: {
    closeRemind: '关闭提醒',
    confirmClosePrompt: '表单数据已经修改，确定要关闭？',
    noExistVersionErr: '当前工作流版本不存在',
    noFoundFormModel: '找不到表单{name}的模型',
    missingToolbarModel: '缺少工具栏部件模型',
    notReceivedPrompt: '没有接收到appDataEntityId',
  },
  // runTime
  ...runTimeZhCN,
  // vue3Util
  ...vue3UtilZhCN,
  // core
  ...coreZhCN,
  // modelHelper
  ...modelHelperZhCN,
};
