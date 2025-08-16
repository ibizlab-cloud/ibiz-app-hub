import { ModelListWriterBase } from '../../model-list-writer-base';
import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';

export class AppUtilListWriter extends ModelListWriterBase {
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
    switch (src['utilType']) {
      case 'DYNADASHBOARD':
        c.fillDSL('app.util.AppDynaDashboardUtil', src, dst);
        return;
      case 'FILTERSTORAGE':
        c.fillDSL('app.util.AppFilterStorageUtil', src, dst);
        return;
    }
    c.fillDSL('app.util.AppUtil', src, dst);
    //super.onFillDSL(context, src, dst)
  }
}
