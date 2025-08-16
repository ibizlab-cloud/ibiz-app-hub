import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { LayoutPosWriterBase } from './layout-pos-writer-base';

export class GridLayoutPosWriter extends LayoutPosWriterBase {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSGridLayoutPos = src

    _.w(d, 'colLG', s);
    _.w(d, 'colLGOffset', s);
    _.w(d, 'colMD', s);
    _.w(d, 'colMDOffset', s);
    _.w(d, 'colSM', s);
    _.w(d, 'colSMOffset', s);
    _.w(d, 'colWidth', s);
    _.w(d, 'colXS', s);
    _.w(d, 'colXSOffset', s);

    super.onFillDSL(c, s, d);
  }
}
