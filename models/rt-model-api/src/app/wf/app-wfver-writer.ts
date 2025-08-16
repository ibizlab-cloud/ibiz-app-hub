import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../../model-object-writer';

export class AppWFVerWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppWFVer = src

    _.w(d, 'codeName', s);
    _.x(d, 'appWFId', s, 'getPSAppWF');

    super.onFillDSL(c, s, d);
  }
}
