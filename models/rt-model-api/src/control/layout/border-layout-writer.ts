import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { LayoutWriterBase } from './layout-writer-base';

export class BorderLayoutWriter extends LayoutWriterBase {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSBorderLayout = src

    _.w(d, 'layout', s);

    super.onFillDSL(c, s, d);
  }
}
