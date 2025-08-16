import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { AjaxControlWriter } from '../ajax-control-writer';

export class CustomControlWriter extends AjaxControlWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSCustomControl = src

    _.w(d, 'customTag', s);
    _.w(d, 'customTag2', s);
    _.w(d, 'predefinedType', s);

    super.onFillDSL(c, s, d);
  }
}
