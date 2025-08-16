import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { AppViewParamWriter } from './app-view-param-writer';

export class AppViewNavParamWriter extends AppViewParamWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppViewNavParam = src

    _.w(d, 'rawValue', s);

    super.onFillDSL(c, s, d);
  }
}
