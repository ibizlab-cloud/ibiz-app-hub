import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { LayoutPosWriterBase } from './layout-pos-writer-base';

export class AbsoluteLayoutPosWriter extends LayoutPosWriterBase {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAbsoluteLayoutPos = src

    _.w(d, 'bottom', s, '', 0);
    _.w(d, 'layoutPos', s);
    _.w(d, 'left', s, '', 0);
    _.w(d, 'right', s, '', 0);
    _.w(d, 'top', s, '', 0);

    super.onFillDSL(c, s, d);
  }
}
