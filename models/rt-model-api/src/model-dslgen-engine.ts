import { IModelDSLGenEngineContext } from './imodel-dslgen-engine-context';
import { ModelDSLGenEngineBase } from './model-dslgen-engine-base';
import { IModelListWriter } from './imodel-list-writer';
import { IModelWriter } from './imodel-writer';

/**
 * dsl 模型转换引擎
 *
 * @author chitanda
 * @date 2023-04-13 14:04:22
 * @export
 * @class ModelDSLGenEngine
 * @extends {ModelDSLGenEngineBase}
 * @implements {IModelDSLGenEngineContext}
 */
export class ModelDSLGenEngine
  extends ModelDSLGenEngineBase
  implements IModelDSLGenEngineContext
{
  /**
   * dsl model writer cache
   *
   * @author chitanda
   * @date 2023-04-13 14:04:33
   * @protected
   * @type {{ [key: string]: IModelWriter }}
   */
  protected modelWriterMap: { [key: string]: IModelWriter } = {};

  /**
   * dsl model writer list cache
   *
   * @author chitanda
   * @date 2023-04-13 14:04:24
   * @protected
   * @type {{ [key: string]: IModelListWriter }}
   */
  protected modelListWriterMap: { [key: string]: IModelListWriter } = {};

  fillDSL(writerCls: string, src: any, dst: any): boolean {
    let writer: IModelWriter | null = this.modelWriterMap[writerCls];
    if (!writer) {
      writer = this.findModelWriter(writerCls);
      this.modelWriterMap[writerCls] = writer;
    }
    writer?.fillDSL(this, src, dst);
    return true;
  }

  fillDSLList(writerCls: string, src: any[], dst: any[]): boolean {
    let writer: IModelListWriter | null = this.modelListWriterMap[writerCls];
    if (!writer) {
      writer = this.findModelListWriter(writerCls);
      this.modelListWriterMap[writerCls] = writer;
    }
    writer?.fillDSLList(this, src, dst);
    return true;
  }

  /**
   * 填充单对象
   *
   * @author chitanda
   * @date 2023-04-14 15:04:55
   * @param {string} writerCls
   * @param {*} src
   * @param {string} key
   * @param {*} [dst]
   * @return {*}  {*}
   */
  s(writerCls: string, src: any, key: string, dst?: any): any {
    if (src == null || src[key] == null) {
      return null;
    }
    // console.log('s: ', writerCls, key);
    if (dst == undefined) {
      dst = {};
    }
    this.fillDSL(writerCls, src[key], dst);
    return dst;
  }

  /**
   * 填充对象列表
   *
   * @author chitanda
   * @date 2023-04-14 15:04:01
   * @param {string} writerCls
   * @param {*} src
   * @param {string} key
   * @param {*} [dst]
   * @return {*}  {*}
   */
  m(writerCls: string, src: any, key: string, dst?: any): any {
    if (src == null || src[key] == null) {
      return null;
    }
    if (dst == undefined) {
      dst = [];
    }
    this.fillDSLList(writerCls, src[key], dst);
    return dst;
  }
}
