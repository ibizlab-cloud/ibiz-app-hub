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
          "caption": "树视图",
          "itemStyle": "DEFAULT",
          "itemType": "CTRLPOS",
          "layoutPos": {
            "shrink": 1,
            "layout": "FLEX"
          },
          "showCaption": true,
          "id": "tree"
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
  "codeName": "MobPickupTreeViewLayout",
  "controlType": "VIEWLAYOUTPANEL",
  "logicName": "实体移动端选择树视图（部件视图）布局面板",
  "appDataEntityId": "mobfrontmodel.mobviewlayoutmodelrepository",
  "controlParam": {},
  "modelId": "3a7363ea828ca54643794b6d61b6f784",
  "modelType": "PSSYSVIEWLAYOUTPANEL",
  "name": "layoutpanel",
  "id": "mobpickuptreeviewlayout"
}
