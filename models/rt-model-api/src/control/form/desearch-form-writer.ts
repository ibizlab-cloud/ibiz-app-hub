import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DEFormWriter } from './deform-writer';

export class DESearchFormWriter extends DEFormWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDESearchForm = src

    _.w(d, 'searchButtonPos', s);
    _.w(d, 'searchButtonStyle', s);
    _.w(d, 'enableAdvanceSearch', s);
    _.w(d, 'enableAutoSearch', s);
    _.w(d, 'enableFilterSave', s);

    super.onFillDSL(c, s, d);
  }
}
