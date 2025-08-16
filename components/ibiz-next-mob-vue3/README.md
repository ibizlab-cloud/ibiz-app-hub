# @ibiz-template/mob-vue3-components

移动端端基于vue3和vant实现的界面组件，包含视图组件、部件组件、编辑器组件、面板项组件、通用vue组件、web端视图引擎、路由、应用构建等组件。

## 📂 项目结构

```
├── src
│   ├── common                                                  公共组件
│   │   ├── action-toolbar                                      行为工具栏
│   │   ├── button-list                                         按钮组
│   │   ├── carousel                                            轮播图片组件
│   │   ├── col                                                 布局-列组件
│   │   ├── cropping                                            图片裁剪组件
│   │   ├── date-range-picker                                   日期范围选择组件
│   │   ├── emoji-select                                        表情选择组件
│   │   ├── fullscreen-header                                   全屏头部组件
│   │   ├── index.ts                                            公共组件注册文件
│   │   ├── keep-alive                                          缓存组件
│   │   ├── md-ctrl-setting                                     多数据部件设置组件
│   │   ├── no-data                                             无数据组件
│   │   ├── preset-view-back                                    预置视图返回按钮组件
│   │   ├── preset-view-header                                  预置视图头部组件
│   │   ├── preview-image                                       预览图片组件
│   │   ├── rawitem                                             直接内容组件
│   │   └── row                                                 布局-行组件
│   ├── control													部件组件
│   │   ├── app-menu                                            应用菜单组件
│   │   │   ├── custom-menu-design                              自定义菜单设计组件
│   │   ├── app-menu-icon-view                                  应用菜单图标视图组件
│   │   ├── app-menu-list-view                                  应用菜单列表视图组件
│   │   ├── calendar                                            日历组件
│   │   ├── caption-bar                                         标题栏组件
│   │   ├── chart                                               图表组件
│   │   ├── dashboard                                           门户看板组件
│   │   │   └── portlet
│   │   │       ├── container-portlet                           门户容器
│   │   │       ├── list-portlet                                门户列表
│   │   │       ├── menu-portlet                                门户菜单
│   │   │       ├── portlet-layout                              门户布局
│   │   │       ├── portlet-part                                门户控件状态
│   │   │       └── view-portlet                                门户视图
│   │   ├── data-view                                           数据视图组件
│   │   ├── drbar                                               关系栏组件
│   │   ├── drtab                                               关系分页组件
│   │   ├── form                                                表单组件
│   │   │   ├── edit-form                                       编辑表单
│   │   │   ├── form                                            表单
│   │   │   ├── form-detail                                     表单详情
│   │   │   │   ├── form-button                                 表单按钮
│   │   │   │   ├── form-button-list                            表单按钮组
│   │   │   │   ├── form-druipart                               表单关系部件
│   │   │   │   ├── form-group-panel                            表单分组面板
│   │   │   │   ├── form-item                                   表单项
│   │   │   │   │   ├── form-item-container                     表单项容器
│   │   │   │   ├── form-mdctrl                                 表单多数据部件
│   │   │   │   │   ├── form-mdctrl-form                        表单多数据部件-表单
│   │   │   │   │   ├── form-mdctrl-md                          表单多数据部件-多数据部件
│   │   │   │   │   ├── form-mdctrl-repeater                    表单多数据部件-重复器
│   │   │   │   │   │   ├── repeater-multi-form                 表单多数据部件-重复器-多表单
│   │   │   │   │   │   └── repeater-single-form                表单多数据部件-重复器-单表单
│   │   │   │   │   └── mdctrl-container                        表单多数据部件容器
│   │   │   │   ├── form-page                                   表单分页
│   │   │   │   ├── form-rawitem                                表单直接内容
│   │   │   │   ├── form-tab-page                               表单tab分页
│   │   │   │   └── form-tab-panel                              表单tab分页面板
│   │   │   └── search-form                                     搜索表单
│   │   ├── index.ts                                            部件组件导出文件
│   │   ├── list                                                列表组件
│   │   │   ├── list                                            普通列表
│   │   │   └── md-ctrl                                         多数据部件
│   │   ├── pickup-view-panel                                   选择视图面板
│   │   ├── search-bar                                          搜索栏组件
│   │   ├── tab-exp-panel                                       分页导航面板
│   │   ├── toolbar                                             工具栏组件
│   │   ├── tree                                                树组件
│   │   ├── tree-exp-bar                                        树导航栏
│   │   └── wizard-panel                                        向导面板
│   ├── editor                                                  编辑器组件
│   │   ├── cascader                                            级联选择器
│   │   ├── check-box                                           复选框
│   │   ├── check-box-list                                      选项列表框
│   │   ├── color-picker                                        颜色选择器
│   │   ├── common
│   │   │   ├── data-mpicker                                    数据多选通用组件
│   │   │   └── right-icon                                      向右箭头图标
│   │   ├── data-picker                                         数据选择器
│   │   │   ├── ibiz-mpicker                                    数据多选组件
│   │   │   ├── ibiz-picker                                     数据选择组件
│   │   │   └── ibiz-picker-select-view                         数据选择器-选择视图
│   │   ├── date-picker                                         日期选择器
│   │   ├── date-range                                          日期范围选择器
│   │   ├── dropdown-list                                       下拉列表
│   │   │   ├── ibiz-dropdown                                   下拉列表-单选
│   │   │   ├── ibiz-dropdown-list                              下拉列表-多选
│   │   │   ├── ibiz-emoji-picker                               表情选择器
│   │   ├── html                                                html编辑器
│   │   ├── index.ts                                            编辑器组件注册文件
│   │   ├── markdown                                            markdown编辑器
│   │   ├── not-supported-editor                                不支持的编辑器
│   │   ├── number-range                                        数字范围选择器
│   │   ├── qrcode                                              二维码组件
│   │   ├── radio-button-list                                   单选框列表
│   │   ├── rate                                                评分组件
│   │   ├── raw                                                 原始组件
│   │   ├── slider                                              滑块
│   │   ├── span                                                span组件
│   │   ├── stepper                                             步进器组件
│   │   ├── switch                                              开关组件
│   │   ├── text-box
│   │   │   ├── ibiz-input-number                               数字输入框
│   │   │   ├── input                                           文本输入框
│   │   └── upload
│   │       ├── ibiz-carousel                                   图片轮播图
│   │       ├── ibiz-file-upload                                文件上传
│   │       ├── ibiz-image-cropping                             图片裁剪
│   │       ├── ibiz-image-select                               图片预览
│   │       ├── ibiz-image-upload                               图片上传
│   ├── ibiz-vue3.ts                                            vue3组件注册文件
│   ├── index.ts                                                vue3组件导出文件
│   ├── locale                                                  多语言
│   │   ├── en                                                  多语言-英文
│   │   └── zh-CN                                               多语言=中文
│   ├── mob-app
│   │   ├── App.scss                                            App样式
│   │   ├── App.tsx                                             App入口组件
│   │   ├── attach-environment-config.ts                        环境变量配置
│   │   ├── components
│   │   │   ├── home-view                                       主页视图
│   │   │   ├── index.ts
│   │   │   ├── modal-router-shell                              模态框路由壳
│   │   │   └── router-shell                                    路由壳
│   │   ├── create-vue-app.ts                                   创建vue3应用
│   │   ├── guard
│   │   │   ├── auth-guard                                      鉴权
│   │   │   ├── auth-guard-hooks.ts                             鉴权钩子
│   │   ├── index.ts                                            权限，路由导出文件
│   │   ├── main.ts                                             入口文件
│   │   ├── router                                              路由
│   │   └── util
│   │       └── unauthorized-handler                            未授权处理
│   ├── panel-component                                         面板组件
│   │   ├── async-action                                        异步操作组件
│   │   ├── auth-sso                                            第三方登录组件
│   │   ├── auth-userinfo                                       用户信息组件
│   │   ├── index.ts                                            面板组件导出文件
│   │   ├── nav-pos-index                                       首页导航占位
│   │   ├── panel-app-title                                     面板-应用标题
│   │   ├── panel-button                                        面板-按钮
│   │   ├── panel-button-list                                   面板-按钮组
│   │   ├── panel-carousel                                      面板-静态轮播图
│   │   ├── panel-tab-panel                                     面板-分页面板
│   │   ├── panel-video-player                                  面板-视频播放器
│   │   ├── user-message                                        面板-用户消息
│   │   ├── view-content-panel-container                        面板-内容容器
│   │   ├── view-footer-panel-container                         面板-页脚面板
│   │   ├── view-header-panel-container                         面板-头部面板
│   │   ├── wf-action-button                                    面板-工作流操作按钮
│   │   └── wf-step-trace                                       面板-流程跟踪
│   ├── platform                                                搭载平台
│   │   ├── ding-talk-platform-provider.ts                      搭载平台-钉钉平台
│   │   ├── ios-platform-provider.ts                            搭载平台-iOS平台
│   │   └── vue-browser-platform-provider.ts                    搭载平台-Vue浏览器平台
│   ├── style                                                   样式
│   ├── util
│   │   ├── app-drawer                                          抽屉
│   │   ├── app-modal                                           弹窗
│   │   ├── app-popover                                         弹出框
│   │   ├── app-util                                            应用工具方法文件，提供登录，登出，更改密码，校验密码等方法
│   │   ├── button-util                                         按钮工具文件，提供转换按钮类型的方法
│   │   ├── confirm-util                                        确认框工具
│   │   ├── directive                                           指令，提供界面元素loading加载的指令
│   │   ├── fullscreen                                          全屏工具
│   │   ├── index.ts                                            工具方法导出文件
│   │   ├── loading-util                                        loading工具，提供显示，隐藏加载动画的方法
│   │   ├── message-util                                        消息工具
│   │   ├── modal-util                                          弹窗工具
│   │   ├── notification-util                                   消息通知工具
│   │   ├── open-view-util                                      打开视图工具
│   │   ├── overlay-controller                                  遮罩层工具
│   │   ├── pagination                                          分页工具
│   │   ├── qrcode-util                                         二维码工具
│   │   ├── scan-qrcode                                         扫描二维码工具
│   │   ├── store                                               存储工具
│   │   │   └── view-stack                                      视图堆栈处理工具
│   │   └── use-popstate-util                                   popstate工具，提供监听popstate事件的能力
│   ├── view                                                    视图
│   │   ├── 404-view                                            404视图
│   │   ├── index.ts                                            视图组件导出文件
│   │   ├── login-view                                          登录视图
│   │   └── portal-view                                         门户视图
│   └── view-engine                                             视图引擎
│       ├── index-view.engine.ts                                首页视图引擎
│       ├── index.ts                                            视图引擎导出文件
│       ├── login-view.engine.ts                                登录视图引擎
│       ├── mob-calendar-view.engine.ts                         日历视图引擎
│       ├── mob-chart-view.engine.ts                            图表视图引擎
│       ├── mob-custom-view.engine.ts                           自定义视图引擎
│       ├── mob-data-view-engine.ts                             数据视图引擎
│       ├── mob-edit-view.engine.ts                             编辑视图引擎
│       ├── mob-edit-view3.engine.ts                            编辑视图3（分页关系）引擎
│       ├── mob-md-view-engine.ts                               数据视图引擎
│       ├── mob-mpickup-view-engine.ts                          多数据选择视图引擎
│       ├── mob-opt-view.engine.ts                              操作视图引擎
│       ├── mob-pickup-md-view.engine.ts                        数据选择视图引擎
│       ├── mob-pickup-tree-view.engine.ts                      树选择视图引擎
│       ├── mob-pickup-view.engine.ts                           选择视图引擎
│       ├── mob-tab-exp-view.engine.ts                          分页导航视图引擎
│       ├── mob-tab-search-view.engine.ts                       分页搜索视图引擎
│       ├── mob-tree-exp-view.engine.ts                         树导航视图引擎
│       ├── mob-tree-view.engine.ts                             树视图引擎
│       ├── mob-wf-dyna-action-view.engine.ts                   动态工作流视图引擎
│       ├── mob-wf-dyna-edit-view.engine.ts                     动态工作流编辑视图引擎
│       ├── mob-wf-dyna-edit-view3.engine.ts                    动态工作流编辑视图3（分页关系）引擎
│       ├── mob-wf-dyna-start-view.engine.ts                    动态工作流启动视图引擎
│       ├── mob-wizard-view-engine.ts                           向导视图引擎
│       ├── portal-view.engine.ts                               门户视图引擎
└───────└── wf-step-trace-view.engine.ts                        工作流步骤跟踪视图引擎
```

## 📌 更改日志

每个版本的详细更改记录在[发行说明](CHANGELOG.md)中。