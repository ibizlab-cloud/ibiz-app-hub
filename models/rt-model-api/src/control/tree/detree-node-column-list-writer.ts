import { ModelListWriterBase } from '../../model-list-writer-base';
import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';

export class DETreeNodeColumnListWriter extends ModelListWriterBase {
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
        c.fillDSL('control.tree.DETreeNodeFieldColumn', src, dst);
        return;
      case 'UAGRIDCOLUMN':
        c.fillDSL('control.tree.DETreeNodeUAColumn', src, dst);
        return;
    }
    c.fillDSL('control.tree.DETreeNodeFieldColumn', src, dst);
    //super.onFillDSL(context, src, dst)
  }
}
