import { ModelListWriterBase } from '../../model-list-writer-base';
import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';

export class DERBaseListWriter extends ModelListWriterBase {
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
    switch (src['dERType']) {
      case 'DER11':
        c.fillDSL('dataentity.der.DER11', src, dst);
        return;
      case 'DER1N':
        c.fillDSL('dataentity.der.DER1N', src, dst);
        return;
    }
    c.fillDSL('dataentity.der.DERBase', src, dst);
    //super.onFillDSL(context, src, dst)
  }
}
