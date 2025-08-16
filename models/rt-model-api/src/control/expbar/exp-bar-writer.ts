import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { AjaxControlContainerWriter } from '../ajax-control-container-writer';

export class ExpBarWriter extends AjaxControlContainerWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSExpBar = src

    _.x(d, 'appCounterRefId', s, 'getPSAppCounterRef');
    _.v(d, 'sysImage', c.s('res.SysImage[]', s, 'getPSSysImage'));
    _.w(d, 'title', s);
    _.v(
      d,
      'titleLanguageRes',
      c.s('res.LanguageRes[]', s, 'getTitlePSLanguageRes'),
    );
    _.w(d, 'xdataControlName', s, 'xDataControlName');
    _.w(d, 'enableCounter', s);
    _.w(d, 'enableSearch', s);
    _.w(d, 'showTitleBar', s);

    super.onFillDSL(c, s, d);
  }
}
