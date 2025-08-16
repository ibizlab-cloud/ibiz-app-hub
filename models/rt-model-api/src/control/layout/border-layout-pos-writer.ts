import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { LayoutPosWriterBase } from './layout-pos-writer-base';

export class BorderLayoutPosWriter extends LayoutPosWriterBase {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSBorderLayoutPos = src

    _.w(d, 'layoutPos', s);

    super.onFillDSL(c, s, d);
  }
}
