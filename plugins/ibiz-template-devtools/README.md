# @ibiz-template/devtool

IBiz系统可视化调试套件，集成开发态建模数据实时查看、运行时状态分析、组件交互调试能力，支持快速定位页面元素与数据模型映射关系，提升开发效率。

## 📂 项目结构

```javascript
├── src
│   ├── components
│   │   ├── detail-info                                     详情信息组件                              
│   │   ├── global-toolbar                                  顶部工具栏组件
│   │   ├── index-page                                      工具壳组件
│   │   ├── index.ts
│   │   ├── object-viewer                                   拷贝组件
│   │   ├── user-config-edit                                用户配置组件
│   │   ├── view-list                                       视图列表组件
│   │   └── view-model-viewer                               视图模型组件
│   ├── controller
│   │   ├── center.controller.ts                            控制中心
│   │   └── dev-tool-config.ts                              开发工具配置文件
│   ├── index.ts
│   ├── interface
│   │   └── i-center-controller-state.ts                    控制器中心状态
│   └── style
│       └── index.scss                                      开发工具样式
```

## 📌 更改日志

每个版本的详细更改记录在[发行说明](CHANGELOG.md)中。
