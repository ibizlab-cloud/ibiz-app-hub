import { ModelListWriterBase } from '../../model-list-writer-base';
import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';

export class DEFDLogicListWriter extends ModelListWriterBase {
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
    switch (src['logicType']) {
      case 'GROUP':
        c.fillDSL('control.form.DEFDGroupLogic', src, dst);
        return;
      case 'SINGLE':
        c.fillDSL('control.form.DEFDSingleLogic', src, dst);
        return;
    }

    //super.onFillDSL(context, src, dst)
  }
}
