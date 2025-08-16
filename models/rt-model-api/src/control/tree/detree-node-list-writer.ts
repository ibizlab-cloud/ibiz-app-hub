import { ModelListWriterBase } from '../../model-list-writer-base';
import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';

export class DETreeNodeListWriter extends ModelListWriterBase {
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
    switch (src['treeNodeType']) {
      case 'CODELIST':
        c.fillDSL('control.tree.DETreeCodeListNode', src, dst);
        return;
      case 'DE':
        c.fillDSL('control.tree.DETreeDataSetNode', src, dst);
        return;
      case 'STATIC':
        c.fillDSL('control.tree.DETreeStaticNode', src, dst);
        return;
    }

    //super.onFillDSL(context, src, dst)
  }
}
