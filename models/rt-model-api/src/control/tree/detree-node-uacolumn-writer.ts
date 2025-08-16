import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DETreeNodeColumnWriter } from './detree-node-column-writer';

export class DETreeNodeUAColumnWriter extends DETreeNodeColumnWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDETreeNodeUAColumn = src

    _.v(
      d,
      'deuiactionGroup',
      c.s('dataentity.uiaction.DEUIActionGroup[]', s, 'getPSDEUIActionGroup'),
    );

    super.onFillDSL(c, s, d);
  }
}
