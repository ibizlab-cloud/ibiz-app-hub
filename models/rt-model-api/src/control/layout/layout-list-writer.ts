import { ModelListWriterBase } from '../../model-list-writer-base';
import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';

export class LayoutListWriter extends ModelListWriterBase {
  onFillDSLList(c: IModelDSLGenEngineContext, src: any[], dst: any[]): void {
    const _ = this;
    src.forEach(item => {
      const dsl = {};
      _.fillDSL(c, item, dsl);
      dst.push(dsl);
    });
    //super.onFillDSLList(context, src, dst)
  }

  onFillDSL(c: IModelDSLGenEngineContext, src: any, dst: any): void {
    switch (src['layout']) {
      case 'ABSOLUTE':
        c.fillDSL('control.layout.AbsoluteLayout', src, dst);
        return;
      case 'BORDER':
        c.fillDSL('control.layout.BorderLayout', src, dst);
        return;
      case 'FLEX':
      case 'SIMPLEFLEX':
        c.fillDSL('control.layout.FlexLayout', src, dst);
        return;
      case 'TABLE':
        c.fillDSL('control.layout.TableLayout', src, dst);
        return;
      case 'TABLE_12COL':
      case 'TABLE_24COL':
        c.fillDSL('control.layout.Grid12Layout', src, dst);
        return;
    }

    //super.onFillDSL(context, src, dst)
  }
}
