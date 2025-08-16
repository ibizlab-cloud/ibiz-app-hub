# @ibiz/rt-model-api

专注于将iBiz建模工厂生成的模型数据，通过编译转化为符合iBiz网页端接口规范的数据。自动完成底层编译的转换，提供符合iBiz网页端接口规范的数据，开发者无需关注细节实现，聚焦于接口规范使用即可。

## 📦 安装

使用 npm 或 pnpm 安装：

```bash
npm install @ibiz/rt-model-api
# 或
pnpm add @ibiz/rt-model-api
```

## 📂 项目结构

```
├── src
│   ├── app
│   │   ├── appmenu                                                            应用菜单编译器
│   │   ├── bi                                                                 智能报表相关编译器
│   │   ├── codelist                                                           代码表编译器
│   │   ├── control                                                            计数器、门户部件编译器
│   │   ├── dataentity                                                         应用实体相关编译器
│   │   ├── func                                                               应用功能编译器
│   │   ├── logic                                                              应用预置逻辑编译器
│   │   ├── mob                                                                应用端特有视图编译器
│   │   ├── msg                                                                应用视图消息编译器
│   │   ├── res                                                                应用引用资源编译器、包含插件引用、输入提示数据集等编译器
│   │   ├── theme                                                              应用主题编译器
│   │   ├── util                                                               应用功能配置编译器，包含搜索条件存储、搜索条件存储等编译器
│   │   ├── valuerule                                                          应用值规则编译器
│   │   ├── view                                                               应用视图编译器
│   │   ├── wf                                                                 工作流相关编译器，包含工作流、工作流版本等编译器
│   │   ├── app-lan-writer.ts                                                  应用多语言编译器
│   │   ├── app-resource-writer.ts                                             应用资源编译器
│   │   ├── application-writer.ts                                              前端应用编译器
│   │   └── sub-app-ref-writer.ts                                              子应用引用编译器
│   ├── codelist                                                               代码表相关编译器，包含代码表项等编译器
│   ├── control                                                                部件编译器
│   │   ├── calendar                                                           日历部件
│   │   ├── captionbar                                                         标题栏部件
│   │   ├── chart                                                              图表部件
│   │   ├── counter                                                            计数器相关编译器
│   │   ├── custom                                                             自定义部件
│   │   ├── dashboard                                                          数据看板部件
│   │   ├── datainfobar                                                        信息栏部件
│   │   ├── dataview                                                           卡片部件
│   │   ├── drctrl                                                             dr部件，包含分页导航、数据关系栏等部件
│   │   ├── editor                                                             编辑器编译器
│   │   ├── expbar                                                             导航部件，包含表格导航、卡片导航、树导航等部件
│   │   ├── form                                                               表单部件，包含编辑表单、搜索表单等部件
│   │   ├── grid                                                               表格部件
│   │   ├── layout                                                             界面布局编译器
│   │   ├── list                                                               列表部件
│   │   ├── map                                                                地图部件
│   │   ├── menu                                                               菜单部件
│   │   ├── panel                                                              面板部件
│   │   ├── rawitem                                                            直接内容编译器
│   │   ├── reportpanel                                                        报表面板部件
│   │   ├── searchbar                                                          搜索栏部件
│   │   ├── titlebar                                                           标题栏编译器
│   │   ├── toolbar                                                            工具栏部件
│   │   ├── tree                                                               树部件
│   │   ├── viewpanel                                                          视图布局面板编译器
│   │   ├── wizardpanel                                                        向导面板部件
│   ├── data                                                                   数据项相关编译器
│   ├── dataentity                                                             实体相关编译器
│   │   ├── ac                                                                 实体自填模式
│   │   ├── action                                                             实体行为
│   │   ├── dataexport                                                         数据导出
│   │   ├── dataimport                                                         数据导入
│   │   ├── datamap                                                            数据映射
│   │   ├── defield                                                            实体属性
│   │   ├── der                                                                实体关系
│   │   ├── ds                                                                 数据查询
│   │   ├── logic                                                              实体逻辑
│   │   ├── mainstate                                                          实体主状态
│   │   ├── print                                                              实体打印
│   │   ├── priv                                                               实体操作标识
│   │   ├── report                                                             实体报表
│   │   ├── uiaction                                                           界面行为
│   │   └── wizard                                                             实体向导
│   ├── msg                                                                    消息相关编译器，如消息模板
│   ├── res                                                                    系统资源相关编译器，如语言资源、系统样式表、系统图片、系统插件等
│   ├── security                                                               访问控制相关编译器，如统一资源等
│   ├── valuerule                                                              值规则相关编译器
│   ├── view                                                                   视图相关编译器，如视图引擎、界面行为组等
│   ├── dsl-helper.ts                                                          模型转换辅助
│   ├── util.ts                                                                工具函数
```

## 📌 更改日志

每个版本的详细更改记录在[发行说明](CHANGELOG.md)中。
