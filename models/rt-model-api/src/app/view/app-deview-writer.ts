import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { AppViewWriter } from './app-view-writer';

export class AppDEViewWriter extends AppViewWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppDEView = src

    _.w(d, 'funcViewMode', s);
    _.w(d, 'funcViewParam', s);
    _.w(d, 'openMode', s);
    _.x(d, 'appCounterRefId', s, 'getPSAppCounterRef');
    _.w(d, 'deviewCodeName', s, 'getPSDEViewCodeName');
    _.w(d, 'deviewId', s, 'getPSDEViewId');
    _.w(d, 'tempMode', s, '', 0);
    _.w(d, 'enableWF', s);

    //let iPSAppDEWFView = src

    _.x(d, 'appWFId', s, 'getPSAppWF');
    _.x(d, 'appWFVerId', s, 'getPSAppWFVer');

    //let iPSAppDEWFActionView = src

    super.onFillDSL(c, s, d);
  }
}
