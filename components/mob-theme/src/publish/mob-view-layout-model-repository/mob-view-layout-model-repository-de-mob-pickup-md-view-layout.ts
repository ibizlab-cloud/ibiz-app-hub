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
          "caption": "搜索栏",
          "itemStyle": "DEFAULT",
          "itemType": "CTRLPOS",
          "layoutPos": {
            "shrink": 1,
            "layout": "FLEX"
          },
          "showCaption": true,
          "id": "searchbar"
        }
      ],
      "predefinedType": "Toolbar",
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
      "id": "view_toolbar2"
    },
    {
      "actionGroupExtractMode": "ITEM",
      "panelItems": [
        {
          "caption": "多数据部件",
          "itemStyle": "DEFAULT",
          "itemType": "CTRLPOS",
          "layoutPos": {
            "grow": 1,
            "shrink": 1,
            "layout": "FLEX"
          },
          "showCaption": true,
          "id": "mdctrl"
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
        "grow": 1,
        "shrink": 1,
        "layout": "FLEX"
      },
      "id": "view_content"
    }
  ],
  "layoutPanel": true,
  "mobilePanel": true,
  "codeName": "MobPickupMDViewLayout",
  "controlType": "VIEWLAYOUTPANEL",
  "logicName": "实体移动端选择多数据视图（部件视图）布局面板",
  "appDataEntityId": "mobfrontmodel.mobviewlayoutmodelrepository",
  "controlParam": {},
  "modelId": "263da46a184bf19f20901f2c1fe2930c",
  "modelType": "PSSYSVIEWLAYOUTPANEL",
  "name": "layoutpanel",
  "id": "mobpickupmdviewlayout"
}
