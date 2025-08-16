export default {
  "viewProxyMode": true,
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
          "id": "control_searchbar"
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
      "id": "control_header"
    },
    {
      "actionGroupExtractMode": "ITEM",
      "panelItems": [
        {
          "caption": "树视图",
          "itemStyle": "DEFAULT",
          "itemType": "CTRLPOS",
          "layoutPos": {
            "grow": 1,
            "shrink": 1,
            "layout": "FLEX"
          },
          "showCaption": true,
          "id": "tree"
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
      "id": "control_tree"
    }
  ],
  "layoutPanel": true,
  "controls": [
    {
      "capLanguageRes": {
        "lanResTag": "DE.LNAME.CONTROLLAYOUTMODELREPOSITORY"
      },
      "caption": "实体移动端树部件布局面板",
      "codeName": "MobTreeLayoutcaptionbar",
      "controlType": "CAPTIONBAR",
      "appDataEntityId": "mobfrontmodel.controllayoutmodelrepository",
      "controlParam": {},
      "name": "captionbar",
      "id": "mobtreelayoutcaptionbar"
    }
  ],
  "codeName": "Usr1023111608",
  "controlType": "VIEWLAYOUTPANEL",
  "logicName": "移动端树部件布局布局面板",
  "appDataEntityId": "mobfrontmodel.controllayoutmodelrepository",
  "controlParam": {},
  "modelId": "6676E7E6-FD4A-4342-97C3-468B43B7B263",
  "modelType": "PSSYSVIEWLAYOUTPANEL",
  "name": "layoutpanel",
  "id": "usr1023111608"
}
