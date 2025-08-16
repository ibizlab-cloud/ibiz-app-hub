import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { AppViewEngineWriterBase } from './app-view-engine-writer-base';

export class AppDEViewEngineWriterBase extends AppViewEngineWriterBase {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppViewEngine = src

    _.w(d, 'engineCat', s);
    _.w(d, 'engineType', s);

    super.onFillDSL(c, s, d);
  }
}
