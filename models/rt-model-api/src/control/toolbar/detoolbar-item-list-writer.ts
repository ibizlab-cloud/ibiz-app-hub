import { ModelListWriterBase } from '../../model-list-writer-base';
import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';

export class DEToolbarItemListWriter extends ModelListWriterBase {
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
    switch (src['itemType']) {
      case 'DEUIACTION':
        c.fillDSL('control.toolbar.DETBUIActionItem', src, dst);
        return;
      case 'ITEMS':
        c.fillDSL('control.toolbar.DETBGroupItem', src, dst);
        return;
      case 'RAWITEM':
        c.fillDSL('control.toolbar.DETBRawItem', src, dst);
        return;
      case 'SEPERATOR':
        c.fillDSL('control.toolbar.DETBSeperatorItem', src, dst);
        return;
    }
    c.fillDSL('control.toolbar.DEToolbarItem', src, dst);
    //super.onFillDSL(context, src, dst)
  }
}
