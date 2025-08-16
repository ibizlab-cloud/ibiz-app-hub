export default {
  "layoutBodyOnly": true,
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
              "caption": "分页导航",
              "itemStyle": "DEFAULT",
              "itemType": "CTRLPOS",
              "layoutPos": {
                "shrink": 1,
                "layout": "FLEX"
              },
              "showCaption": true,
              "id": "tabexppanel"
            }
          ],
          "predefinedType": "ToolbarContainer",
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
          "id": "view_toolbar_container2"
        }
      ],
      "layout": {
        "layout": "FLEX"
      },
      "dataRegionType": "INHERIT",
      "caption": "容器",
      "itemStyle": "DEFAULT",
      "itemType": "CONTAINER",
      "layoutPos": {
        "basis": 0,
        "grow": 0,
        "shrink": 0,
        "layout": "FLEX"
      },
      "id": "view_top"
    },
    {
      "actionGroupExtractMode": "ITEM",
      "panelItems": [
        {
          "rawItem": {
            "predefinedType": "NAV_POS",
            "id": "nav_pos"
          },
          "caption": "导航区占位",
          "itemStyle": "DEFAULT",
          "itemType": "RAWITEM",
          "layoutPos": {
            "grow": 1,
            "shrink": 1,
            "layout": "FLEX"
          },
          "showCaption": true,
          "id": "nav_pos"
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
        "grow": 1,
        "shrink": 1,
        "layout": "FLEX"
      },
      "id": "view_content"
    }
  ],
  "layoutPanel": true,
  "mobilePanel": true,
  "codeName": "MobTabExpViewLayout",
  "controlType": "VIEWLAYOUTPANEL",
  "logicName": "实体移动端分页导航视图布局面板",
  "appDataEntityId": "mobfrontmodel.mobviewlayoutmodelrepository",
  "controlParam": {},
  "modelId": "d61b91df91028d625616458b901c1d70",
  "modelType": "PSSYSVIEWLAYOUTPANEL",
  "name": "layoutpanel",
  "id": "mobtabexpviewlayout"
}
