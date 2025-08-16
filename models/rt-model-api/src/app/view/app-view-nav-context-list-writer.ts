import { ModelListWriterBase } from '../../model-list-writer-base';
import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';

export class AppViewNavContextListWriter extends ModelListWriterBase {
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
    c.fillDSL('app.view.AppViewNavContext', src, dst);
    //super.onFillDSL(context, src, dst)
  }
}
