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
        "shrink": 0,
        "layout": "FLEX"
      },
      "id": "view_header2"
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
  "codeName": "MobTABEXPView9Layout",
  "controlType": "VIEWLAYOUTPANEL",
  "logicName": "实体移动端分页导航视图（部件视图）布局面板布局面板",
  "appDataEntityId": "mobfrontmodel.mobviewlayoutmodelrepository",
  "controlParam": {},
  "modelId": "cfa9000fb383d8dafa57c2d37e5a9304",
  "modelType": "PSSYSVIEWLAYOUTPANEL",
  "name": "layoutpanel",
  "id": "mobtabexpview9layout"
}
