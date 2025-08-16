/**
 * @description 组织数据
 * @export
 * @interface IOrgData
 */
export interface IOrgData {
  /**
   * @description 组织标识
   * @type {string}
   * @memberof IOrgData
   */
  orgid: string;
  /**
   * @description 组织名称
   * @type {string}
   * @memberof IOrgData
   */
  orgname: string;
  /**
   * @description 中心系统标识
   * @type {string}
   * @memberof IOrgData
   */
  dcsystemid: string;
  /**
   * @description 系统标识
   * @type {string}
   * @memberof IOrgData
   */
  systemid: string;
}
