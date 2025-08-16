import { IModelDSLGenEngineContext } from './imodel-dslgen-engine-context';
import { IModelWriter } from './imodel-writer';
export interface IModelListWriter extends IModelWriter {
  /**
   * 将标准模型转换到dsl模型
   * @param context
   * @param src
   * @param dst
   */
  fillDSLList(context: IModelDSLGenEngineContext, src: any[], dst: any[]);
}
