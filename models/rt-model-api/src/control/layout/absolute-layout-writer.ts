import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { LayoutWriterBase } from './layout-writer-base';

export class AbsoluteLayoutWriter extends LayoutWriterBase {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAbsoluteLayout = src

    _.w(d, 'layout', s);

    super.onFillDSL(c, s, d);
  }
}
