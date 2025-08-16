import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DEDRCtrlWriter } from './dedrctrl-writer';

export class DEDRTabWriter extends DEDRCtrlWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEDRTab = src

    _.v(
      d,
      'dedrtabPages',
      c.m('control.drctrl.DEDRTabPage[]', s, 'getPSDEDRTabPages'),
    );

    super.onFillDSL(c, s, d);
  }
}
