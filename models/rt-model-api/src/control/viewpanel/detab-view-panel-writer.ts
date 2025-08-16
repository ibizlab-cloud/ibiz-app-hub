import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DEViewPanelWriter } from './deview-panel-writer';

export class DETabViewPanelWriter extends DEViewPanelWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDETabViewPanel = src

    _.w(d, 'counterId', s);
    _.w(d, 'navFilter', s);
    _.v(d, 'navDER', c.s('dataentity.der.DERBase[]', s, 'getNavPSDER'));
    _.x(d, 'appCounterRefId', s, 'getPSAppCounterRef');
    _.x(d, 'deopprivId', s, 'getPSDEOPPriv');
    _.v(d, 'sysImage', c.s('res.SysImage[]', s, 'getPSSysImage'));
    _.w(d, 'parentDataJO', s);

    super.onFillDSL(c, s, d);
  }
}
