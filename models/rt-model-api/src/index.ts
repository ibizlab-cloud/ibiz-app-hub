/* eslint-disable @typescript-eslint/ban-types */
export { DSLHelper } from './dsl-helper';

export * from './util';

declare global {
  /**
   * 标准JSON对象
   *
   * @interface IModel
   * @extends {Object}
   */
  interface IModel extends Object {
    [key: string | symbol]: any;
  }

  /**
   * api 模型对象
   *
   * @author chitanda
   * @date 2023-04-13 17:04:02
   * @interface ModelObject
   * @extends {Object}
   */
  interface ModelObject extends Object {
    [key: string | symbol]: any;
  }
}
