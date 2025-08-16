import { IModelDSLGenEngineContext } from '../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../model-object-writer';

export class SysCssWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSSysCss = src

    _.w(d, 'codeName', s);
    _.w(d, 'cssName', s);
    _.w(d, 'cssStyle', s);
    _.w(d, 'designCssStyle', s);

    super.onFillDSL(c, s, d);
  }
}
