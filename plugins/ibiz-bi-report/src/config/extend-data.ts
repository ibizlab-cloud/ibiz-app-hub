/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
export enum extendData {
  // 过滤器模式，'default'|'pql'
  FILTERMODE = 'extend.filterMode',
  // pql值
  PQLVALUE = 'extend.pqlValue',
  // 指标聚合模式，'SUM' | 'AVG' | 'MAX' | 'MIN' | 'COUNT' | 'EXISTS' | 'NOTEXISTS' | 'GROUP' | 'USER' | 'USER2' | 'USER3' | 'USER4'
  AGGMODE = 'extend.aggmode',
  // 维度时间范围参数
  PERIOD = 'extend.period',
  // 维度排序参数
  SORT = 'extend.sort',
  // 应用轴
  AXIS = 'extend.axis',
  // 警戒线
  CORDON = 'extend.cordon',
}
