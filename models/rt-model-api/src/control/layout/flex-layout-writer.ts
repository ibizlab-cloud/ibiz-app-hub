import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { LayoutWriterBase } from './layout-writer-base';

export class FlexLayoutWriter extends LayoutWriterBase {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSFlexLayout = src

    _.w(d, 'align', s);
    _.w(d, 'dir', s);
    _.w(d, 'layout', s);
    _.w(d, 'valign', s, 'vAlign');

    super.onFillDSL(c, s, d);
  }
}
