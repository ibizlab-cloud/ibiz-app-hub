import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DEFDLogicWriter } from './defdlogic-writer';

export class DEFDGroupLogicWriter extends DEFDLogicWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEFDGroupLogic = src

    _.w(d, 'groupOP', s);
    _.v(d, 'defdlogics', c.m('control.form.DEFDLogic[]', s, 'getPSDEFDLogics'));
    _.w(d, 'notMode', s);

    super.onFillDSL(c, s, d);
  }
}
