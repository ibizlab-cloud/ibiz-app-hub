import { IModelDSLGenEngineContext } from '../imodel-dslgen-engine-context';
import { ControlObjectWriter2 } from './control-object-writer2';

export class ControlItemWriter2 extends ControlObjectWriter2 {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSControlItemNavigatable = src

    _.v(
      d,
      'controlAttributes',
      c.m('control.ControlAttribute[]', s, 'getPSControlAttributes'),
    );
    _.v(
      d,
      'controlLogics',
      c.m('control.ControlLogic[]', s, 'getPSControlLogics'),
    );
    _.v(
      d,
      'controlRenders',
      c.m('control.ControlRender[]', s, 'getPSControlRenders'),
    );

    super.onFillDSL(c, s, d);
  }
}
