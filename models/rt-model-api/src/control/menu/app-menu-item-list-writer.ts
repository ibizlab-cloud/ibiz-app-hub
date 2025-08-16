import { ModelListWriterBase } from '../../model-list-writer-base';
import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';

export class AppMenuItemListWriter extends ModelListWriterBase {
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
      case 'APPMENUREF':
        c.fillDSL('control.menu.AppMenuAMRef', src, dst);
        return;
      case 'MENUITEM':
        c.fillDSL('control.menu.AppMenuItem', src, dst);
        return;
      case 'RAWITEM':
        c.fillDSL('control.menu.AppMenuRawItem', src, dst);
        return;
      case 'SEPERATOR':
        c.fillDSL('control.menu.AppMenuSeperator', src, dst);
        return;
    }
    c.fillDSL('control.menu.AppMenuItem', src, dst);
    //super.onFillDSL(context, src, dst)
  }
}
