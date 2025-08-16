import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { LayoutWriterBase } from './layout-writer-base';

export class Grid12LayoutWriter extends LayoutWriterBase {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSGridLayout = src

    _.w(d, 'columnCount', s);
    _.w(d, 'layout', s);

    super.onFillDSL(c, s, d);
  }
}
