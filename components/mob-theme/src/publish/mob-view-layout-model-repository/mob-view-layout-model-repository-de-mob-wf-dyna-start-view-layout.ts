export default {
  "layoutMode": "FLEX",
  "layout": {
    "layout": "FLEX"
  },
  "rootPanelItems": [
    {
      "actionGroupExtractMode": "ITEM",
      "panelItems": [
        {
          "actionGroupExtractMode": "ITEM",
          "panelItems": [
            {
              "actionGroupExtractMode": "ITEM",
              "panelItems": [
                {
                  "actionGroupExtractMode": "ITEM",
                  "panelItems": [
                    {
                      "caption": "左侧工具栏",
                      "itemStyle": "DEFAULT",
                      "itemType": "CTRLPOS",
                      "layoutPos": {
                        "grow": 1,
                        "shrink": 1,
                        "heightMode": "FULL",
                        "layout": "FLEX",
                        "valignSelf": "MIDDLE",
                        "widthMode": "FULL"
                      },
                      "showCaption": true,
                      "id": "lefttoolbar"
                    }
                  ],
                  "layout": {
                    "layout": "FLEX"
                  },
                  "dataRegionType": "INHERIT",
                  "caption": "容器",
                  "contentWidth": 100,
                  "itemStyle": "DEFAULT",
                  "itemType": "CONTAINER",
                  "layoutPos": {
                    "basis": 100,
                    "shrink": 0,
                    "layout": "FLEX",
                    "width": 100,
                    "widthMode": "PX"
                  },
                  "width": 100,
                  "id": "view_left_toolbar"
                },
                {
                  "actionGroupExtractMode": "ITEM",
                  "panelItems": [
                    {
                      "caption": "标题栏",
                      "itemStyle": "DEFAULT",
                      "itemType": "CTRLPOS",
                      "layoutPos": {
                        "shrink": 1,
                        "heightMode": "FULL",
                        "layout": "FLEX",
                        "widthMode": "FULL"
                      },
                      "showCaption": true,
                      "id": "captionbar"
                    }
                  ],
                  "layout": {
                    "align": "center",
                    "dir": "row",
                    "layout": "FLEX"
                  },
                  "dataRegionType": "INHERIT",
                  "caption": "容器",
                  "itemStyle": "DEFAULT",
                  "itemType": "CONTAINER",
                  "layoutPos": {
                    "grow": 1,
                    "shrink": 1,
                    "layout": "FLEX"
                  },
                  "id": "view_captionbar"
                },
                {
                  "actionGroupExtractMode": "ITEM",
                  "panelItems": [
                    {
                      "caption": "工具栏",
                      "itemStyle": "DEFAULT",
                      "itemType": "CTRLPOS",
                      "layoutPos": {
                        "grow": 1,
                        "shrink": 1,
                        "heightMode": "FULL",
                        "layout": "FLEX",
                        "valignSelf": "MIDDLE",
                        "widthMode": "FULL"
                      },
                      "showCaption": true,
                      "id": "righttoolbar"
                    }
                  ],
                  "layout": {
                    "layout": "FLEX"
                  },
                  "dataRegionType": "INHERIT",
                  "caption": "容器",
                  "contentWidth": 100,
                  "itemStyle": "DEFAULT",
                  "itemType": "CONTAINER",
                  "layoutPos": {
                    "basis": 100,
                    "shrink": 0,
                    "layout": "FLEX",
                    "width": 100,
                    "widthMode": "PX"
                  },
                  "width": 100,
                  "id": "view_right_toolbar"
                }
              ],
              "predefinedType": "Toolbar",
              "layout": {
                "dir": "row",
                "layout": "FLEX"
              },
              "dataRegionType": "INHERIT",
              "caption": "容器",
              "itemStyle": "DEFAULT",
              "itemType": "CONTAINER",
              "layoutPos": {
                "shrink": 1,
                "layout": "FLEX"
              },
              "id": "view_toolbar"
            }
          ],
          "predefinedType": "Header",
          "layout": {
            "dir": "column",
            "layout": "FLEX"
          },
          "dataRegionType": "INHERIT",
          "caption": "容器",
          "itemStyle": "DEFAULT",
          "itemType": "CONTAINER",
          "layoutPos": {
            "shrink": 0,
            "layout": "FLEX"
          },
          "id": "view_header"
        }
      ],
      "predefinedType": "PANELPART",
      "layout": {
        "layout": "FLEX"
      },
      "dataRegionType": "INHERIT",
      "caption": "引用布局面板",
      "itemStyle": "DEFAULT",
      "itemType": "CONTAINER",
      "layoutPos": {
        "shrink": 1,
        "layout": "FLEX"
      },
      "showCaption": true,
      "id": "panelpart"
    },
    {
      "actionGroupExtractMode": "ITEM",
      "panelItems": [
        {
          "caption": "表单",
          "itemStyle": "DEFAULT",
          "itemType": "CTRLPOS",
          "layoutPos": {
            "shrink": 1,
            "layout": "FLEX"
          },
          "showCaption": true,
          "id": "form"
        }
      ],
      "predefinedType": "Content",
      "layout": {
        "layout": "FLEX"
      },
      "dataRegionType": "INHERIT",
      "caption": "容器",
      "itemStyle": "DEFAULT",
      "itemType": "CONTAINER",
      "layoutPos": {
        "shrink": 1,
        "layout": "FLEX"
      },
      "id": "view_content"
    },
    {
      "actionGroupExtractMode": "ITEM",
      "panelItems": [
        {
          "actionType": "UIACTION",
          "buttonStyle": "DEFAULT",
          "buttonType": "PANELBUTTON",
          "uiactionId": "view_cancelaction",
          "renderMode": "BUTTON",
          "tooltip": "取消",
          "caption": "取消",
          "itemStyle": "DEFAULT",
          "itemType": "BUTTON",
          "layoutPos": {
            "shrink": 1,
            "layout": "FLEX"
          },
          "showCaption": true,
          "id": "button_cancelaction"
        },
        {
          "actionType": "UIACTION",
          "buttonStyle": "DEFAULT",
          "buttonType": "PANELBUTTON",
          "uiactionId": "view_okaction",
          "renderMode": "BUTTON",
          "tooltip": "确定",
          "caption": "确定",
          "itemStyle": "DEFAULT",
          "itemType": "BUTTON",
          "layoutPos": {
            "shrink": 1,
            "layout": "FLEX"
          },
          "showCaption": true,
          "id": "button_okaction"
        }
      ],
      "predefinedType": "Footer",
      "layout": {
        "align": "space-around",
        "dir": "row",
        "layout": "FLEX"
      },
      "dataRegionType": "INHERIT",
      "caption": "容器",
      "itemStyle": "DEFAULT",
      "itemType": "CONTAINER",
      "layoutPos": {
        "shrink": 1,
        "layout": "FLEX"
      },
      "id": "view_footer"
    }
  ],
  "layoutPanel": true,
  "mobilePanel": true,
  "codeName": "MobWFDynaActionViewLayout",
  "controlType": "VIEWLAYOUTPANEL",
  "logicName": "实体移动端工作流动态启动视图布局面板(预置模型)",
  "appDataEntityId": "mobfrontmodel.mobviewlayoutmodelrepository",
  "controlParam": {},
  "modelId": "D2EAA5B3-6BAF-4FC6-A890-B3F2204855F1",
  "modelType": "PSSYSVIEWLAYOUTPANEL",
  "name": "layoutpanel",
  "id": "mobwfdynaactionviewlayout"
}
