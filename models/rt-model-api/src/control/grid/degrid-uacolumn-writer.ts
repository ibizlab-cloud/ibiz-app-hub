import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DEGridColumnWriter } from './degrid-column-writer';

export class DEGridUAColumnWriter extends DEGridColumnWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEGridUAColumn = src

    _.v(
      d,
      'deuiactionGroup',
      c.s('dataentity.uiaction.DEUIActionGroup[]', s, 'getPSDEUIActionGroup'),
    );

    super.onFillDSL(c, s, d);
  }
}
