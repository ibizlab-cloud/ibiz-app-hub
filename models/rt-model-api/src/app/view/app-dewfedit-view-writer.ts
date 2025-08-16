import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { AppDEEditViewWriter } from './app-deedit-view-writer';

export class AppDEWFEditViewWriter extends AppDEEditViewWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppDEWFEditView = src

    _.w(d, 'wfstepValue', s, 'wFStepValue');
    _.w(d, 'wfiamode', s, 'wFIAMode');

    super.onFillDSL(c, s, d);
  }
}
