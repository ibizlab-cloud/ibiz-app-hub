import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DETreeColumnWriter } from './detree-column-writer';

export class DETreeDEFColumnWriter extends DETreeColumnWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDETreeDEFColumn = src

    _.w(d, 'dataItemName', s);
    _.w(d, 'defaultValue', s);

    super.onFillDSL(c, s, d);
  }
}
