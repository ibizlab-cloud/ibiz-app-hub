import { IModelDSLGenEngineContext } from '../../imodel-dslgen-engine-context';
import { DETreeNodeWriterBase } from './detree-node-writer-base';

export class DETreeCodeListNodeWriter extends DETreeNodeWriterBase {
  onFillDSL(c: IModelDSLGenEngineContext, s: any, d: any) {
    const _ = this;

    //let iPSDETreeCodeListNode = src

    _.x(d, 'codeListId', s, 'getPSCodeList');
    _.w(d, 'appendCaption', s);

    super.onFillDSL(c, s, d);
  }
}
