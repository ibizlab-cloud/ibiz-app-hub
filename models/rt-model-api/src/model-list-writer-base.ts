import { IModelDSLGenEngineContext } from './imodel-dslgen-engine-context';
import { IModelListWriter } from './imodel-list-writer';
import { IModelWriter } from './imodel-writer';

export class ModelListWriterBase implements IModelListWriter, IModelWriter {
  fillDSLList(
    iModelDSLGenEngineContext: IModelDSLGenEngineContext,
    src: any[],
    dst: any[],
  ) {
    return this.onFillDSLList(iModelDSLGenEngineContext, src, dst);
  }

  onFillDSLList(
    iModelDSLGenEngineContext: IModelDSLGenEngineContext,
    src: any[],
    dst: any[],
  ) {
    throw new Error('Method not implemented.');
  }

  fillDSL(
    iModelDSLGenEngineContext: IModelDSLGenEngineContext,
    src: any,
    dst: any,
  ) {
    return this.onFillDSL(iModelDSLGenEngineContext, src, dst);
  }

  onFillDSL(
    iModelDSLGenEngineContext: IModelDSLGenEngineContext,
    src: any,
    dst: any,
  ) {}
}
