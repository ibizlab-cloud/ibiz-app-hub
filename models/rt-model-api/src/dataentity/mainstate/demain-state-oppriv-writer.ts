import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../../model-object-writer';

export class DEMainStateOPPrivWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEMainStateOPPriv = src

    _.x(d, 'deopprivId', s, 'getPSDEOPPriv');

    super.onFillDSL(c, s, d);
  }
}
