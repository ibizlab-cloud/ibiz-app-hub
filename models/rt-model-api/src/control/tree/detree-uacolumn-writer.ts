import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DETreeColumnWriter } from './detree-column-writer';

export class DETreeUAColumnWriter extends DETreeColumnWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDETreeUAColumn = src

    _.v(
      d,
      'deuiactionGroup',
      c.s('dataentity.uiaction.DEUIActionGroup[]', s, 'getPSDEUIActionGroup'),
    );

    super.onFillDSL(c, s, d);
  }
}
