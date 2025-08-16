import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { AppDEGridViewWriter } from './app-degrid-view-writer';

export class AppDEWFGridViewWriter extends AppDEGridViewWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppDEWFActionView = src

    _.w(d, 'wfstepValue', s, 'wFStepValue');
    _.w(d, 'wfiamode', s, 'wFIAMode');

    super.onFillDSL(c, s, d);
  }
}
