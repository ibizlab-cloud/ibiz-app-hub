import { ModelListWriterBase } from '../../model-list-writer-base';
import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';

export class AppUtilViewListWriter extends ModelListWriterBase {
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
    switch (src['viewType']) {
      case 'APPERRORVIEW':
        c.fillDSL('app.view.AppErrorView', src, dst);
        return;
      case 'APPFUNCPICKUPVIEW':
        c.fillDSL('app.view.AppFuncPickupView', src, dst);
        return;
    }
    c.fillDSL('app.view.AppUtilView', src, dst);
    //super.onFillDSL(context, src, dst)
  }
}
