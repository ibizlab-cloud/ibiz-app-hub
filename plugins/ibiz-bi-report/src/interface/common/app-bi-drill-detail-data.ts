// 指标下转项
type AppBIDrillDetailMeasureItem = {
  name: string;
};

// 维度下转项
type AppBIDrillDetailDimensionItem = {
  value: unknown;
} & AppBIDrillDetailMeasureItem;

// 反查参数
export interface IAppBIDrillDetailData {
  measure: AppBIDrillDetailMeasureItem;
  dimension?: AppBIDrillDetailDimensionItem[];
}
