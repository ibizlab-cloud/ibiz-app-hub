import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DEFormDetailWriter } from './deform-detail-writer';

export class DEFormUserControlWriter extends DEFormDetailWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEFormUserControl = src

    _.w(d, 'ctrlParams', s);
    _.w(d, 'predefinedType', s);

    super.onFillDSL(c, s, d);
  }
}
