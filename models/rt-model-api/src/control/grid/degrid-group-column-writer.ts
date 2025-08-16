import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DEGridColumnWriter } from './degrid-column-writer';

export class DEGridGroupColumnWriter extends DEGridColumnWriter {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDEGridGroupColumn = src

    _.v(
      d,
      'degridColumns',
      c.m('control.grid.DEGridColumn[]', s, 'getPSDEGridColumns'),
    );

    super.onFillDSL(c, s, d);
  }
}
