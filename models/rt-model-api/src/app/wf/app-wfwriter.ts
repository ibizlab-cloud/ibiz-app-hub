import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { ModelObjectWriter } from '../../model-object-writer';

export class AppWFWriter extends ModelObjectWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSAppWF = src

    _.w(d, 'codeName', s);
    _.v(d, 'appWFDEs', c.m('app.wf.AppWFDE[]', s, 'getPSAppWFDEs'));
    _.v(d, 'appWFVers', c.m('app.wf.AppWFVer[]', s, 'getPSAppWFVers'));
    _.w(d, 'hasAppWFVer', s, 'hasPSAppWFVer');

    super.onFillDSL(c, s, d);
  }
}
