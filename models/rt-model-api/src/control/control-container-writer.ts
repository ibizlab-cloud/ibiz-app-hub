import { IModelDSLGenEngineContext } from '../imodel-dslgen-engine-context';
import { ControlWriter } from './control-writer';

export class ControlContainerWriter extends ControlWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSControlContainer = src

    _.v(
      d,
      'appCounterRefs',
      c.m('app.control.AppCounterRef[]', s, 'getPSAppCounterRefs'),
    );
    _.v(
      d,
      'appViewEngines',
      c.m('app.view.AppViewEngine[]', s, 'getPSAppViewEngines'),
    );
    _.v(
      d,
      'appViewLogics',
      c.m('app.view.AppViewLogic[]', s, 'getPSAppViewLogics'),
    );
    _.v(d, 'appViewRefs', c.m('app.view.AppViewRef[]', s, 'getPSAppViewRefs'));
    _.v(d, 'controls', c.m('control.Control[]', s, 'getPSControls'));

    super.onFillDSL(c, s, d);
  }
}
