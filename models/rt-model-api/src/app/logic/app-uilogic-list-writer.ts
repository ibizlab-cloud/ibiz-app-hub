import { ModelListWriterBase } from '../../model-list-writer-base';
import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';

export class AppUILogicListWriter extends ModelListWriterBase {
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
    switch (src['viewLogicType']) {
      case 'APP_NEWDATA':
        c.fillDSL('app.logic.BuiltinAppUINewDataLogic', src, dst);
        return;
      case 'APP_OPENDATA':
        c.fillDSL('app.logic.BuiltinAppUIOpenDataLogic', src, dst);
        return;
    }
    c.fillDSL('app.logic.AppUILogic', src, dst);
    //super.onFillDSL(context, src, dst)
  }
}
