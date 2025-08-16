# @ibiz-template/mob-theme

移动端主题样式库，包含所有视图、部件预定义布局模型，同时也包含主题的颜色、间距、圆角、遮罩等主题配置，包含亮色主题、暗色主题。

## 📂 项目结构

```javascript
|── mob-theme
    ├── src
        ├── index.ts
        ├── publish                                                                             预置布局模型
        │   ├── app-index-view-layout-blank-mode.ts                                             应用首页视图布局_空白模式
        │   ├── app-index-view-layout.ts                                                        首页视图布局面板
        │   ├── app-login-view.ts                                                               应用登录视图
        │   ├── app-wf-step-trace-view-layout.ts                                                应用流程跟踪视图布局面板
        │   ├── control-layout                                                                  预置部件布局模型
        │   │   ├── control-layout-model-repository-mob-tree-exp-bar-layout.ts                  移动端树导航栏布局面板
        │   │   └── control-layout-model-repository-mob-tree-layout.ts                          移动端树部件布局布局面板
        │   ├── index.ts
        │   └── mob-view-layout-model-repository                                                预置视图布局模型
        │       ├── mob-view-layout-model-repository-de-mob-calendar-view-9-layout.ts           实体移动端日历视图（部件视图）布局面板布局面板
        │       ├── mob-view-layout-model-repository-de-mob-calendar-view-layout.ts             实体移动端日历视图布局面板
        │       ├── mob-view-layout-model-repository-de-mob-chart-view-9-layout.ts              实体移动端图表视图（部件视图）布局面板布局面板
        │       ├── mob-view-layout-model-repository-de-mob-chart-view-layout.ts                实体移动端图表视图布局面板
        │       ├── mob-view-layout-model-repository-de-mob-data-view-layout.ts                 实体移动端卡片视图布局面板
        │       ├── mob-view-layout-model-repository-de-mob-edit-view-3-layout.ts               实体移动端编辑视图分页关系布局面板(预置模型)
        │       ├── mob-view-layout-model-repository-de-mob-edit-view-9-layout.ts               实体移动端编辑视图（部件视图）布局面板布局面板
        │       ├── mob-view-layout-model-repository-de-mob-edit-view-layout.ts                 实体移动端编辑视图布局面板
        │       ├── mob-view-layout-model-repository-de-mob-list-view-layout.ts                 实体移动端列表视图布局面板
        │       ├── mob-view-layout-model-repository-de-mob-m-pickup-view-layout.ts             实体移动端多数据选择视图布局面板
        │       ├── mob-view-layout-model-repository-de-mob-md-view-9-layout.ts                 实体移动端多数据视图（部件视图）布局面板布局面板
        │       ├── mob-view-layout-model-repository-de-mob-md-view-layout.ts                   实体移动端多数据视图布局面板
        │       ├── mob-view-layout-model-repository-de-mob-option-view-layout.ts               实体移动端操作视图布局面板
        │       ├── mob-view-layout-model-repository-de-mob-pickup-md-view-layout.ts            实体移动端选择多数据视图（部件视图）布局面板
        │       ├── mob-view-layout-model-repository-de-mob-pickup-tree-view-layout.ts          实体移动端选择树视图（部件视图）布局面板
        │       ├── mob-view-layout-model-repository-de-mob-pickup-view-layout.ts               实体移动端数据选择视图布局面板
        │       ├── mob-view-layout-model-repository-de-mob-tab-exp-view-9-layout.ts            实体移动端分页导航视图（部件视图）布局面板布局面板
        │       ├── mob-view-layout-model-repository-de-mob-tab-exp-view-layout.ts              实体移动端分页导航视图布局面板
        │       ├── mob-view-layout-model-repository-de-mob-tree-exp-view-layout.ts             移动端树导航视图布局面板
        │       ├── mob-view-layout-model-repository-de-mob-tree-view-layout.ts                 实体移动端树视图布局面板
        │       ├── mob-view-layout-model-repository-de-mob-wf-dyna-action-view-layout.ts       实体移动端工作流动态操作视图布局面板(预置模型)
        │       ├── mob-view-layout-model-repository-de-mob-wf-dyna-edit-view-3-layout.ts       实体移动端工作流动态编辑视图分页关系布局面板(预置模型)
        │       ├── mob-view-layout-model-repository-de-mob-wf-dyna-edit-view-layout.ts         实体移动端工作流动态编辑视图布局面板(预置模型)
        │       ├── mob-view-layout-model-repository-de-mob-wf-dyna-start-view-layout.ts        实体移动端工作流动态启动视图布局面板(预置模型)
        │       └── mob-view-layout-model-repository-de-mob-wizard-view-layout.ts               实体移动端向导视图布局面板
        └── theme
            ├── elements
            │   └── index.scss                                                                  dom元素样式
            ├── generic
            │   ├── index.scss
            │   └── vant.scss                                                                   vant重写样式
            ├── index.scss
            ├── objects
            │   ├── index.scss
            │   └── state
            │       └── state.scss                                                               默认组件样式扩展      
            ├── theme
            │   ├── dark
            │   │   └── dark-theme.scss                                                         暗色主题样式
            │   ├── index.scss
            │   └── light
            │       └── light-theme.scss                                                        亮色主题样式
            ├── tumps
            │   └── index.scss                                                                  特异性样式，可使用important
            └── var.scss                                                                        默认变量
```

## 📌 更改日志

每个版本的详细更改记录在[发行说明](CHANGELOG.md)中。
