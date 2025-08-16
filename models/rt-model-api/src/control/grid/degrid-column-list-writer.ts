import { ModelListWriterBase } from '../../model-list-writer-base';
import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';

export class DEGridColumnListWriter extends ModelListWriterBase {
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
    switch (src['columnType']) {
      case 'DEFGRIDCOLUMN':
        c.fillDSL('control.grid.DEGridFieldColumn', src, dst);
        return;
      case 'GROUPGRIDCOLUMN':
        c.fillDSL('control.grid.DEGridGroupColumn', src, dst);
        return;
      case 'UAGRIDCOLUMN':
        c.fillDSL('control.grid.DEGridUAColumn', src, dst);
        return;
    }
    c.fillDSL('control.grid.DEGridFieldColumn', src, dst);
    //super.onFillDSL(context, src, dst)
  }
}
