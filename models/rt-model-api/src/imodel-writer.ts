import { IModelDSLGenEngineContext } from './imodel-dslgen-engine-context';

export interface IModelWriter {
  /**
   * 将标准模型转换到dsl模型
   * @param context
   * @param src
   * @param dst
   */
  fillDSL(context: IModelDSLGenEngineContext, src: any, dst: any);
}
