import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { LayoutPosWriterBase } from './layout-pos-writer-base';

export class FlexLayoutPosWriter extends LayoutPosWriterBase {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSFlexLayoutPos = src

    _.w(d, 'basis', s);
    _.w(d, 'grow', s);
    _.w(d, 'shrink', s, '', 1);

    super.onFillDSL(c, s, d);
  }
}
