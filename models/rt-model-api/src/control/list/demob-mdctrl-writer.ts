import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DEListWriter } from './delist-writer';

export class DEMobMDCtrlWriter extends DEListWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEMobMDCtrl = src

    _.v(
      d,
      'deuiactionGroup',
      c.s('dataentity.uiaction.DEUIActionGroup[]', s, 'getPSDEUIActionGroup'),
    );
    _.v(
      d,
      'deuiactionGroup2',
      c.s('dataentity.uiaction.DEUIActionGroup[]', s, 'getPSDEUIActionGroup2'),
    );
    _.v(
      d,
      'deuiactionGroup3',
      c.s('dataentity.uiaction.DEUIActionGroup[]', s, 'getPSDEUIActionGroup3'),
    );
    _.v(
      d,
      'deuiactionGroup4',
      c.s('dataentity.uiaction.DEUIActionGroup[]', s, 'getPSDEUIActionGroup4'),
    );
    _.v(
      d,
      'deuiactionGroup5',
      c.s('dataentity.uiaction.DEUIActionGroup[]', s, 'getPSDEUIActionGroup5'),
    );
    _.v(
      d,
      'deuiactionGroup6',
      c.s('dataentity.uiaction.DEUIActionGroup[]', s, 'getPSDEUIActionGroup6'),
    );

    super.onFillDSL(c, s, d);
  }
}
